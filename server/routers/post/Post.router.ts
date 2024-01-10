/* eslint-disable no-unsafe-optional-chaining */
import {Context} from 'prisma/context';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';
import {Prisma} from '@prisma/client';
import {z} from 'zod';
import PostCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostCreateArgsSchema';
import {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';
import {findManyPhotoHashtagSchema, findManyWithPhotoSchema} from './schemas/findManyWithPhotoSchema';
import {PhotoGetQueryRawType, PostGetQueryRawTypeTry} from './type';
import {PhotoGetHashtagOnlySql, PhotoGetSql} from './db/queries';
import {mergeRawPhotoManyWithSqlResults, mergeRawPhotosWithSqlResults, transformPosts} from './functions/organize';
import {generateSQLOrderClause, generateSQLWhereClause} from './db/queryBuilder';
import {PostFindFirstForDetailSchema} from './schemas/PostFindFirstForDetailSchema';
import {findManyRepliesSchema} from './schemas/findManyRepliesSchema';
import {findManyMtDetailPhotoSchema} from './schemas/findManyMtDetailPhotoSchema';
import {extractUniquePostIds} from '../../functions/etc';
import {findManyUserProfileMediaSchema} from './schemas/findManyUserProfileMediaSchema';
import {findManyInfiniteScrollSchema} from './schemas/findManyInfiniteScrollSchema';
import {PostCreateSchema} from './schemas/postCreateSchema';
import {CreateWithHashtagSchema} from './schemas/CreateWithHashtagSchema';
import {EditWithHashtagSchema} from './schemas/EditWithHashtagSchema';

export const postsRouter = t.router({
  createOne: protectedProcedure.input(PostCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOnePost = await ctx.prisma.post.create({include: {User: true, Photo: true, Replies: {include: {User: true}}}, data: input.data});
    return createOnePost;
  }),
  // これは全部で使えるmtId trailheadId mtFacilityId
  createWithHashtag: publicProcedure.input(CreateWithHashtagSchema).mutation(async ({ctx, input}) => {
    const {images} = input.data;
    console.log({input});
    function connect() {
      const connections: {Mountain?: {connect: {id: number}}; MtFacility?: {connect: {id: number}}; MtTrailhead?: {connect: {id: number}}} = {};

      if (input.data.mtId) connections.Mountain = {connect: {id: input.data.mtId}};
      if (input.data.mtFacilityId) connections.MtFacility = {connect: {id: input.data.mtFacilityId}};
      if (input.data.trailheadId) connections.MtTrailhead = {connect: {id: input.data.trailheadId}};
      return connections;
    }
    const result = await ctx.prisma.$transaction(async (prisma) => {
      const createOnePost = await prisma.post.create({
        select: {
          Photo: {
            select: {
              id: true,
            },
          },
        },
        data: {
          ...connect(),
          content: input.data.content,
          User: {connect: {id: input.data.userId}},
          activityDate: input.data.activityDate,
          ...(input.data.hashtagName && {
            PostToHashtag: {
              create: {
                Hashtag: {
                  connectOrCreate: {
                    create: {tag: input.data.hashtagName},
                    where: {tag: input.data.hashtagName},
                  },
                },
              },
            },
          }),
          ...(input.data.hashtagIds && {
            PostToHashtag: {
              create: input.data.hashtagIds.map((hashtagId) => ({
                Hashtag: {connect: {id: hashtagId}},
              })),
            },
          }),
          Photo: {
            create: (images || []).map((image) => ({
              uploadStatus: 'uploading',
              title: image.title,
              thumbnail: image.thumbnail,
              original: image.original,
              type: image.type,
              width: image.width,
              height: image.height,
            })),
          },
        },
      });

      // labelを登録するために保存したphotoを取得
      const postPhotos = (createOnePost.Photo || []).map((t) => ({id: t.id}));

      // 各画像のlabelを登録する
      if (images) {
        const labelCreationPromises = images.flatMap(
          (image, imageIdx) =>
            image.labels?.map(async (label) => {
              return prisma.photoLabel.create({
                data: {
                  ...(label.mtId && {Mountain: {connect: {id: label.mtId}}}),
                  Photo: {connect: {id: postPhotos[imageIdx].id}},
                  labelTop: label.y,
                  labelLeft: label.x,
                },
              });
            }) || []
        );
        await Promise.all(labelCreationPromises);
      }
      return createOnePost;
    });
    return result;
  }),
  editWithHashtag: protectedProcedure.input(EditWithHashtagSchema).mutation(async ({ctx, input}) => {
    const {images} = input.data;
    const existingDbPhotoIds = (images || []).map((v) => v.dbPhotoId || 0);
    function connect() {
      const connections: {Mountain?: {connect: {id: number}}; MtFacility?: {connect: {id: number}}; MtTrailhead?: {connect: {id: number}}} = {};

      if (input.data.mtId) connections.Mountain = {connect: {id: input.data.mtId}};
      if (input.data.mtFacilityId) connections.MtFacility = {connect: {id: input.data.mtFacilityId}};
      if (input.data.trailheadId) connections.MtTrailhead = {connect: {id: input.data.trailheadId}};
      return connections;
    }

    const result = await ctx.prisma.$transaction(async (prisma) => {
      // postIdに関連する全部のPhotoLabelを削除
      await prisma.photoLabel.deleteMany({
        where: {
          Photo: {
            postId: input.data.postId,
          },
        },
      });

      // postIdに紐づく情報を削除
      await prisma.post.update({
        where: {id: input.data.postId},
        data: {
          mtId: null,
          mtFacilityId: null,
          mtTrailheadId: null,
          PostToHashtag: {deleteMany: {}},
          Photo: {
            deleteMany: {
              id: {notIn: existingDbPhotoIds}, // すでにdbにあるものは削除しない
            },
          },
        },
      });

      const createOnePost = await prisma.post.update({
        select: {
          Photo: {
            select: {
              id: true,
            },
          },
        },
        where: {id: input.data.postId},
        data: {
          ...connect(),
          content: input.data.content,
          User: {connect: {id: input.data.userId}},
          activityDate: input.data.activityDate,
          ...(input.data.hashtagName && {
            PostToHashtag: {
              create: {
                Hashtag: {
                  connectOrCreate: {
                    create: {tag: input.data.hashtagName},
                    where: {tag: input.data.hashtagName},
                  },
                },
              },
            },
          }),
          ...(input.data.hashtagIds && {
            PostToHashtag: {
              create: input.data.hashtagIds.map((hashtagId) => ({
                Hashtag: {connect: {id: hashtagId}},
              })),
            },
          }),
          Photo: {
            create: (images || [])
              .filter((v) => !v.dbPhotoId) // すでにdbにあるものは作らない
              .map((image) => ({
                title: image.title,
                thumbnail: image.thumbnail,
                original: image.original,
                type: image.type,
                width: image.width,
                height: image.height,
              })),
          },
        },
      });

      // labelを登録するために保存したphotoを取得
      const postPhotos = (createOnePost.Photo || []).map((t) => ({id: t.id}));

      // 各画像のlabelを登録する、これは全て削除してから全て登録する
      if (images) {
        const labelCreationPromises = images.flatMap(
          (image, imageIdx) =>
            image.labels?.map(async (label) => {
              return prisma.photoLabel.create({
                data: {
                  ...(label.mtId && {Mountain: {connect: {id: label.mtId}}}),
                  Photo: {connect: {id: postPhotos[imageIdx].id}},
                  labelTop: label.y,
                  labelLeft: label.x,
                },
              });
            }) || []
        );
        await Promise.all(labelCreationPromises);
      }
      return createOnePost;
    });
    return result;
  }),
  // これはMtFacilityに置くべき
  create: protectedProcedure.input(PostCreateSchema).mutation(async ({ctx, input}) => {
    const {images} = input.data;
    const reversedImages = images ? [...images].reverse() : [];
    const createOnePost = await ctx.prisma.mtFacility.update({
      where: {id: input.data.mtFacilityId},
      data: {
        Post: {
          create: {
            content: input.data.content,
            User: {connect: {id: input.data.userId}},
            activityDate: input.data.activityDate,
            ...(input.data.hashtagName && {
              PostToHashtag: {
                create: {
                  Hashtag: {
                    connectOrCreate: {
                      create: {tag: input.data.hashtagName},
                      where: {tag: input.data.hashtagName},
                    },
                  },
                },
              },
            }),

            Photo: {
              create: (reversedImages || []).map((image) => ({
                title: image.title,
                thumbnail: image.thumbnail,
                original: image.original,
                type: image.type,
                width: image.width,
                height: image.height,
              })),
            },
          },
        },
      },
    });
    return createOnePost;
  }),

  findFirstForDetail: publicProcedure.input(PostFindFirstForDetailSchema).query(async ({ctx, input}) => {
    const findFirstPost = await ctx.prisma.post.findFirst({
      where: {id: input.id},
      select: {
        id: true,
        content: true,
        Replies: {select: {id: true}},
        createdAt: true,
        Photo: {
          select: {
            width: true,
            height: true,
            type: true,
            uploadStatus: true,
            original: true,
            thumbnail: true,
            title: true,
            PhotoLabel: {
              select: {
                labelLeft: true,
                labelTop: true,
                Mountain: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            MountainToPhoto: {include: {Mountain: true}},
          },
        },
        User: true,
        Mountain: true,
        PostToHashtag: {include: {Hashtag: true}},
      },
    });
    return findFirstPost;
  }),
  findFirstForEdit: publicProcedure.input(PostFindFirstForDetailSchema).query(async ({ctx, input}) => {
    const findFirstPost = await ctx.prisma.post.findFirst({
      where: {id: input.id},
      select: {
        content: true,
        Photo: {
          select: {
            id: true,
            type: true,
            original: true,
            thumbnail: true,
            width: true,
            height: true,
            PhotoLabel: {
              select: {
                labelLeft: true,
                labelTop: true,
                Mountain: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
            MountainToPhoto: {select: {Mountain: true}},
          },
        },
        Replies: true,
        User: true,
        Mountain: {select: {id: true}},
        MtFacility: {select: {id: true}},
        MtTrailhead: {select: {id: true}},
        PostToHashtag: {include: {Hashtag: true}},
      },
    });
    return findFirstPost;
  }),
  // findMany: protectedProcedure.input(PostFindManyArgsSchema).query(async ({ctx, input}) => {
  //   const findManyPost = await ctx.prisma.post.findMany(input);
  //   return findManyPost;
  // }),

  findManyInfiniteScroll: publicProcedure.input(findManyInfiniteScrollSchema).query(async ({ctx, input}) => {
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const determineOrderBy = (orderByInput: (typeof findManyInfiniteScrollSchema)['_type']['orderBy']): Prisma.PostOrderByWithRelationInput => {
      if (orderByInput === 'likeDesc') return {PostLike: {_count: 'desc'}};
      return {createdAt: 'desc'};
    };
    const determineWhere = (trailheadId?: number | null, mtFacilityId?: number | null, mtId?: number | null): Prisma.PostWhereInput => {
      if (trailheadId) return {mtTrailheadId: trailheadId};
      if (mtFacilityId) return {mtFacilityId};
      return {mtId};
    };

    const posts = await ctx.prisma.post.findMany({
      take: limit,
      skip: cursor,
      orderBy: determineOrderBy(input.orderBy),
      where: determineWhere(input.trailheadId, input.mtFacilityId, input.mtId),
      select: {
        id: true,
        createdAt: true,
        content: true,
        Photo: true,
        User: {
          select: {
            id: true,
            name: true,
            userName: true,
            iconThumbnail: true,
            image: true,
          },
        },
        PostToHashtag: {select: {Hashtag: {select: {id: true, tag: true}}}},
      },
    });
    const count = await ctx.prisma.post.count({where: determineWhere(input.trailheadId, input.mtFacilityId, input.mtId)});
    return {posts, count, nextCursor: nextCursor < count ? nextCursor : null};
  }),

  findManyReplies: publicProcedure.input(findManyRepliesSchema).query(async ({ctx, input}) => {
    const findManyPost = await ctx.prisma.post.findFirst({
      select: {
        Replies: {
          include: {
            Replies: {
              select: {
                content: true,
                userId: true,
                id: true,
                parentId: true,
                activityDate: true,
                User: true,
              },
            },
            User: {
              select: {
                id: true,
                name: true,
                userName: true,
                iconThumbnail: true,
                image: true,
              },
            },
          },
        },
      },
      where: {id: input.postId},
    });
    const result = findManyPost?.Replies.map((reply) => ({...reply, status: 'success'})).map((reply) => ({
      ...reply,
      Replies: reply.Replies?.map((reply) => ({...reply, status: 'success'})) || [],
    }));
    return {Replies: result || []};
  }),

  findManyPhotoHashtag: publicProcedure.input(findManyPhotoHashtagSchema).query(async ({ctx, input}) => {
    const {mountainId} = input;
    // 入力されたハッシュタグからハッシュタグのIDを取得
    const hashtags = await ctx.prisma.hashtag.findMany({
      where: {
        tag: {in: input.hashtags},
      },
      select: {id: true},
    });

    if (hashtags.length !== input.hashtags?.length) {
      return [];
    }

    const hashtagIds = hashtags.map((hashtag) => hashtag.id);

    const stringQuery = ctx.prisma.$queryRawUnsafe<PhotoGetQueryRawType[]>(
      PhotoGetHashtagOnlySql(hashtagIds, mountainId),
      ...hashtagIds,
      input.take || 3,
      input.skip || 0
    );
    const countQuery = ctx.prisma.$queryRawUnsafe<{count: string}[]>(
      PhotoGetHashtagOnlySql(hashtagIds, mountainId, true),
      ...hashtagIds,
      input.take || 3,
      input.skip || 0
    );

    const [photos, count] = await Promise.all([stringQuery, countQuery]);
    console.log(count);

    return {photos, count: Number(count[0] ? count[0].count : 0)};
  }),

  findManyUserProfilePost: publicProcedure.input(findManyUserProfileMediaSchema).query(async ({ctx, input}) => {
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const findPosts = ctx.prisma.post.findMany({
      orderBy: {createdAt: 'desc'},
      where: {
        ...(input.likeOnly ? {PostLike: {some: {userId: input.userId}}} : {userId: input.userId}),
        ...(input.replyOnly ? {parentId: {not: null}} : {parentId: null}),
      },
      include: {
        PostToHashtag: {select: {Hashtag: {select: {id: true, tag: true}}}},
        User: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            image: true,

            name: true,
            email: true,
            password: true,
            userName: true,
            iconOriginal: true,
            iconThumbnail: true,
          },
        },
        Photo: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            deletedAt: true,
            type: true,
            title: true,
            order: true,
            original: true,
            thumbnail: true,
            width: true,
            height: true,
            uploadStatus: true,
            postId: true,
          },
          take: 1,
        },
      },
      take: limit,
      skip: cursor,
    });

    const countQuery = ctx.prisma.post.count({
      where: {
        userId: input.userId,
        parentId: null,
      },
    });

    const [posts, count] = await Promise.all([findPosts, countQuery]);

    return {
      posts,
      count,
      nextCursor: nextCursor < count ? nextCursor : null,
    };
  }),

  findManyUserProfileMedia: publicProcedure.input(findManyUserProfileMediaSchema).query(async ({ctx, input}) => {
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const findPosts = await ctx.prisma.post.findMany({
      orderBy: {createdAt: 'desc'},
      where: {
        userId: input.userId,
        Photo: {some: {}},
      },
      include: {
        Photo: {
          select: {
            id: true,
            postId: true,
            type: true,
            original: true,
            thumbnail: true,
            width: true,
            height: true,
            title: true,
            uploadStatus: true,
          },
          take: 1,
        },
      },
      take: limit,
      skip: cursor,
    });

    const countQuery = ctx.prisma.post.count({
      where: {
        userId: input.userId,
        Photo: {some: {}},
      },
    });

    // photoだけの配列にする
    const photosQuery = findPosts.map((post) => post.Photo[0]);

    const [photos, count] = await Promise.all([photosQuery, countQuery]);

    return {
      photos,
      count,
      nextCursor: nextCursor < count ? nextCursor : null,
    };
  }),

  findManyWithPhoto: publicProcedure.input(findManyWithPhotoSchema).query(async ({ctx, input}) => {
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const [whereClause, bindValues] = generateSQLWhereClause(input, 3);
    const orderClause = generateSQLOrderClause(input);

    const stringQuery = ctx.prisma.$queryRawUnsafe<PhotoGetQueryRawType[]>(
      PhotoGetSql(whereClause, orderClause, !!input.photoExistsOnly),
      limit,
      cursor,
      ...bindValues
    );
    const countQuery = ctx.prisma.$queryRawUnsafe<{count: string}[]>(
      PhotoGetSql(whereClause, orderClause, !!input.photoExistsOnly, true),
      limit,
      cursor,
      ...bindValues
    );

    const [posts, countResult] = await Promise.all([stringQuery, countQuery]);
    const count = Number(countResult[0].count);

    // photoを合わせる
    const uniquePostIds = extractUniquePostIds(posts, 'Post_id');
    const rawPhotos = await getPhotosByUniquePostIds(uniquePostIds, ctx);
    const photos = mergeRawPhotosWithSqlResults(posts, rawPhotos);

    return {photos, count, nextCursor: nextCursor < count ? nextCursor : null};
  }),
  findManyWithPhotos: publicProcedure.input(findManyWithPhotoSchema).query(async ({ctx, input}) => {
    const orderClause = generateSQLOrderClause(input);
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const [whereClause, bindValues] = generateSQLWhereClause(input, 3);

    const stringQuery = ctx.prisma.$queryRawUnsafe<PostGetQueryRawTypeTry[]>(
      PhotoGetSql(whereClause, orderClause, !!input.photoExistsOnly),
      limit,
      cursor,
      ...bindValues
    );
    const countQuery = ctx.prisma.$queryRawUnsafe<{count: string}[]>(
      PhotoGetSql(whereClause, orderClause, !!input.photoExistsOnly, true),
      limit,
      cursor,
      ...bindValues
    );

    const [posts, countResult] = await Promise.all([stringQuery, countQuery]);
    const count = Number(countResult[0].count);

    // postにphotoを合わせる
    const uniquePostIds = extractUniquePostIds(posts, 'Post_id');
    const rawPhotos = await getPhotosByUniquePostIds(uniquePostIds, ctx);
    const photoMergedPosts = mergeRawPhotoManyWithSqlResults(posts, rawPhotos);

    // postに関連したハッシュタグを取得
    const rawHashtags = await ctx.prisma.postToHashtag.findMany({
      where: {postId: {in: uniquePostIds}},
      select: {postId: true, Hashtag: {select: {id: true, tag: true}}},
    });

    const result = transformPosts(photoMergedPosts).map((post) => ({
      ...post,
      PostToHashtag: rawHashtags.filter((hashtag) => hashtag.postId === post.id),
    }));

    return {
      posts: result,
      count,
      nextCursor: nextCursor < count ? nextCursor : null,
    };
  }),

  /**
   * 山の詳細のもっと見るボタンの画像取得
   */
  findManyMtDetailPhoto: publicProcedure.input(findManyMtDetailPhotoSchema).query(async ({ctx, input}) => {
    const hashtagNames: string[] = input.searchFilter?.includeHashTags?.value ? [...input.searchFilter?.includeHashTags.value] : [];
    const {mtId, viewTo} = input;
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    /* ↓↓↓ 共通 ↓↓↓ */
    let orderBy: Prisma.PostOrderByWithRelationInput;
    switch (input.orderBy) {
      case 'likeDesc':
        orderBy = {PostLike: {_count: 'desc'}};
        break;
      default:
        orderBy = {createdAt: 'desc'};
    }

    const hashtagWhere: Prisma.PhotoWhereInput['Post'] = {
      PostToHashtag: {
        some: {
          Hashtag: {tag: {in: hashtagNames}},
        },
      },
    };
    /* ↑↑↑ 共通 ↑↑↑ */

    let result = [];
    let count = 0;

    if (viewTo === true) {
      // この山が見える
      const where: Prisma.PhotoWhereInput = {
        Post: hashtagNames.length > 0 ? hashtagWhere : {}, // hashtagがある場合は、PostToHashtagを経由してPostを取得する
        PhotoLabel: {some: {mtId}},
      };

      count = await ctx.prisma.photo.count({where});
      const photos = await ctx.prisma.photo.findMany({
        orderBy: {
          Post: orderBy,
        },
        take: limit,
        skip: cursor,
        where,
        select: {
          id: true,
          type: true,
          order: true,
          original: true,
          thumbnail: true,
          width: true,
          height: true,
          uploadStatus: true,
          title: true,
          Post: {
            select: {
              id: true,
              content: true,
              Photo: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      result = photos.map((photo) => {
        return {
          ...photo,
          postId: photo.Post?.id || 0,
          initialSlideIdx: photo.Post?.Photo.findIndex((p) => p.id === photo.id) || 0, // この山が見えるの場合は、Postに紐づくPhotoの中から、自分のidを探して、そのindexを初期値にする
          uploadStatus: photo.uploadStatus as uploadStatusType,
        };
      });
    } else {
      // すべて
      const where: Prisma.PostWhereInput = {
        ...(hashtagNames.length > 0 ? hashtagWhere : {}),
        mtId,
      };
      count = await ctx.prisma.post.count({where});
      const posts = await ctx.prisma.post.findMany({
        orderBy,
        take: limit,
        skip: cursor,
        where,
        select: {
          id: true,
          content: true,
          Photo: {
            take: 1,
            orderBy: {id: 'asc'},
            select: {
              id: true,
              type: true,
              order: true,
              original: true,
              thumbnail: true,
              width: true,
              height: true,
              uploadStatus: true,
              title: true,
            },
          },
        },
      });

      result = posts.map((post) => {
        const photo = post.Photo[0];
        return {
          ...photo,
          postId: post.id,
          initialSlideIdx: 0,
          uploadStatus: photo.uploadStatus as uploadStatusType,
        };
      });
    }

    return {photos: result, count, nextCursor: nextCursor < count ? nextCursor : null};
  }),

  /**
   * 何だこれ
   */
  deleteOne: protectedProcedure.input(z.object({id: z.number()})).mutation(async ({ctx, input}) => {
    const userId = ctx.session?.user.id;

    await ctx.prisma.post.delete({
      where: {
        id: input.id,
        userId,
      },
    });
  }),
});

/* 関数 */
export async function getPhotosByUniquePostIds(uniquePostIds: number[], ctx: Context) {
  return ctx.prisma.photo.findMany({
    where: {postId: {in: uniquePostIds}},
    orderBy: {id: 'asc'},
  });
}
