/* eslint-disable no-unsafe-optional-chaining */
import {publicProcedure, t} from 'server/trpc';

import {Prisma} from '@prisma/client';

import PhotoFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/PhotoFindManyArgsSchema';
import {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';
import {findManyMtFacilityPhotoSchema} from './schemas/findManyMtFacilityPhotoSchema';
import {findManyPhotoSchema} from './schemas/findManyPhotoSchema';
import {findManyTrailheadPhotoSchema} from './schemas/findManyTrailheadPhotoSchema';

export const photosRouter = t.router({
  findMany: publicProcedure.input(PhotoFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyPhoto = await ctx.prisma.photo.findMany(input);
    return findManyPhoto;
  }),
  findManyMtFacilityPhoto: publicProcedure.input(findManyMtFacilityPhotoSchema).query(async ({ctx, input}) => {
    const hashtagNames: string[] = input.searchFilter?.includeHashTags?.value ? [...input.searchFilter?.includeHashTags.value] : [];
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const hashtagWhere: Prisma.PhotoWhereInput['Post'] = {
      PostToHashtag: {
        some: {
          Hashtag: {tag: {in: hashtagNames}},
        },
      },
    };
    const where: Prisma.PostWhereInput = {
      ...(hashtagNames.length > 0 ? hashtagWhere : {}),
      mtFacilityId: input.mtFacilityId,
    };

    const count = await ctx.prisma.post.count({where});
    const posts = await ctx.prisma.post.findMany({
      take: limit,
      skip: cursor,
      include: {
        Photo: {
          select: {id: true, original: true, type: true, thumbnail: true, width: true, height: true, title: true, postId: true, uploadStatus: true},
          take: 1,
          orderBy: {id: 'desc'},
        },
      },
      where,
      orderBy: {
        ...(input.orderBy === 'createdAtDesc' && {createdAt: 'desc'}),
        ...(input.orderBy === 'likeDesc' && {PostLike: {_count: 'desc'}}),
        ...(!input.orderBy && {createdAt: 'desc'}),
      },
    });

    const result = posts.map((post) => post.Photo).flat(); // photoだけの配列にする

    return {photos: result, count, nextCursor: nextCursor < count ? nextCursor : null};
  }),
  findManyTrailheadPhoto: publicProcedure.input(findManyTrailheadPhotoSchema).query(async ({ctx, input}) => {
    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    const where: Prisma.PostWhereInput = {mtTrailheadId: input.trailheadId};

    const findManyPhotoQuery = ctx.prisma.post.findMany({
      take: limit,
      skip: cursor,
      include: {
        Photo: {
          select: {id: true, original: true, type: true, thumbnail: true, width: true, height: true, title: true, postId: true, uploadStatus: true},
          take: 1,
          orderBy: {id: 'desc'},
        },
      },
      where,
      orderBy: {
        ...(input.orderBy === 'createdAtDesc' && {createdAt: 'desc'}),
        ...(input.orderBy === 'likeDesc' && {PostLike: {_count: 'desc'}}),
        ...(!input.orderBy && {createdAt: 'desc'}),
      },
    });
    const [posts, count] = await Promise.all([findManyPhotoQuery, ctx.prisma.post.count({where})]);

    const result = posts.map((post) => {
      const photo = post.Photo[0];
      return {...photo, uploadStatus: photo.uploadStatus as uploadStatusType};
    });

    return {photos: result, count, nextCursor: nextCursor < count ? nextCursor : null};
  }),
  findManyPhoto: publicProcedure.input(findManyPhotoSchema).query(async ({ctx, input}) => {
    const limit = input.limit || 9;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;
    const hashtagWheres: Prisma.PhotoWhereInput[] | undefined = input.hashtags?.map((tag) => ({
      Post: {
        PostToHashtag: {
          some: {
            Hashtag: {
              tag,
            },
          },
        },
      },
    }));
    const where: Prisma.PhotoWhereInput = {
      Post: {
        mtFacilityId: input.facilityId,
        mtId: input.mtId,
        mtTrailheadId: input.trailheadId,
      },
      AND: hashtagWheres,
    };

    const findManyPhoto = ctx.prisma.photo.findMany({
      take: limit,
      skip: cursor,
      where,
      select: {
        id: true,
        original: true,
        thumbnail: true,
        type: true,
        title: true,
        postId: true,
        width: true,
        height: true,
      },
    });
    const countQuery = ctx.prisma.photo.count({where});

    const [photos, count] = await Promise.all([findManyPhoto, countQuery]);

    return {photos, count, nextCursor: nextCursor < count ? nextCursor : null};
  }),
});
