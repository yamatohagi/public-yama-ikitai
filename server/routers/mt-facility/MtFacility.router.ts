import {protectedProcedure, publicProcedure, t} from 'server/trpc';

import {polishMtFacility} from 'generated/extra-fields';
import {toN} from 'server/functions/toN';
import {booleanNullToInt} from 'server/functions/etc';
import {z} from 'zod';
import cuid from 'cuid';
import MtFacilityFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/MtFacilityFindFirstArgsSchema';
import MtFacilityFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/MtFacilityFindManyArgsSchema';
import {MtFacilityFindManyRawSchema} from './schemas/mtFacilityFindManyRawSchema';
import {generateSQLOrderClause, generateSQLWhereClause} from './query-service/facilityQb';

import {transformTrailheads} from './functions/organize';
import {MtFacilityGetQueryRawType, MtFacilityGetManySql, getMtf} from './query-service/facilityQs';
import {MtFacilityCreateSchema} from './schemas/mtFacilityCreateSchema';
import {UpdateSpecificItemSchema} from './schemas/UpdateSpecificItemSchema';
import {PostCreateSchema} from './schemas/postCreateSchema';

import {FindUniqueByEditSchema} from './schemas/findUniqueByEditSchema';
import {MtFacilityEditSchema} from './schemas/mtFacilityEditSchema';

export const mtFacilitiesRouter = t.router({
  postCreate: protectedProcedure.input(PostCreateSchema).mutation(async ({ctx, input}) => {
    const {images} = input.data;

    const postContent = input.data.content; // 投稿の内容
    const userId = cuid(); // 投稿者のユーザーID

    // トランザクションを開始
    const result = await ctx.prisma.$transaction(async (prisma) => {
      // まず、単一のPostを作成
      const post = await prisma.post.create({
        data: {
          content: postContent,
          userId,
          activityDate: new Date(),
          // PostToPhotoはまだここでは作成しません
        },
      });

      // 次に、そのPost IDを使用して、複数のPhotoを作成
      const photos = await Promise.all(
        (images || []).map((image) =>
          prisma.photo.create({
            data: {
              original: image.original,
              thumbnail: image.thumbnail,
              title: image.title,
              type: image.type,
              width: image.width,
              height: image.height,
              postId: post.id, // 作成したPostのIDを使う
            },
          })
        )
      );

      // 最後に、MtFacilityを更新して、関連するPhotoの情報を追加
      const mtFacility = await prisma.mtFacility.update({
        where: {
          id: input.data.mtFacilityId,
        },
        data: {
          MtFacilityToPhoto: {
            create: photos.map((photo) => ({
              indoor: true,
              photoId: photo.id, // 作成したPhotoのIDを使う
            })),
          },
        },
      });

      return {post, photos, mtFacility};
    });

    // トランザクションの結果を利用
    console.log(result);

    return result;
  }),
  create: protectedProcedure.input(MtFacilityCreateSchema).mutation(async ({ctx, input}) => {
    const {TrailheadToMtFacility, MountainToMtFacility, MtFacilityTypeIds, RsvMethodIds, PayMethodIds, BusinessPeriod} = input.data;
    const {images} = input.data;
    // imagesの順番を逆にする todo:なぜか順番が逆になってしまうので、ここで逆にしているorder持った方がいい
    const reversedImages = images?.reverse();
    const cleanedData = polishMtFacility(input.data);

    const createOneMtFacility = await ctx.prisma.mtFacility.create({
      data: {
        ...cleanedData,
        docomo: toN(input.data.docomo),
        au: toN(input.data.au),
        softbank: toN(input.data.softbank),
        rakuten: toN(input.data.rakuten),
        postalCode: toN(input.data.postalCode.replace(/-/g, '')),
        listElevation: toN(input.data.listElevation),
        tStay: booleanNullToInt(input.data.tStay),
        tCafeSpace: booleanNullToInt(input.data.tCafeSpace),
        tTent: booleanNullToInt(input.data.tTent),
        tShop: booleanNullToInt(input.data.tShop),
        tToilet: booleanNullToInt(input.data.tToilet),
        tBathSink: booleanNullToInt(input.data.tBathSink),
        tChangingRoom: booleanNullToInt(input.data.tChangingRoom),
        tDryRoom: booleanNullToInt(input.data.tDryRoom),
        tBath: booleanNullToInt(input.data.tBath),
        tWave: booleanNullToInt(input.data.tWave),
        tWifi: booleanNullToInt(input.data.tWifi),
        tPublicPhone: booleanNullToInt(input.data.tPublicPhone),
        tKitchen: booleanNullToInt(input.data.tKitchen),
        tTalkRoom: booleanNullToInt(input.data.tTalkRoom),
        tOther: booleanNullToInt(input.data.tOther),

        MtFacilityToPhoto: {
          create: (reversedImages || [])
            .filter((v) => !v.dbPhotoId)
            .map((image) => ({
              Photo: {
                create: {
                  title: image.title,
                  thumbnail: image.thumbnail,
                  original: image.original,
                  type: image.type,
                  width: image.width,
                  height: image.height,
                },
              },
            })),
        },

        MtFacilityToMtFacilityType: {
          createMany: {
            data: (MtFacilityTypeIds || []).map((mtFacilityTypeId) => ({
              mtFacilityTypeId,
            })),
          },
        },
        MtFacilityToRsvMethod: {
          createMany: {
            data: (RsvMethodIds || []).map((id) => ({
              rsvMethodId: id,
            })),
          },
        },
        MtFacilityToPayMethod: {
          createMany: {
            data: (PayMethodIds || []).map((id) => ({
              payMethodId: id,
            })),
          },
        },
        TrailheadToMtFacility: {
          createMany: {
            data: (TrailheadToMtFacility || []).map((info) => {
              const timeTo = toN(info.timeTo);
              const distanceTo = toN(info.distanceTo);
              const timeFrom = toN(info.timeFrom);
              const distanceFrom = toN(info.distanceFrom);

              return {
                trailheadId: info.trailheadId,
                timeTo,
                distanceTo,
                timeFrom,
                distanceFrom: distanceFrom || distanceTo,
                remark: info.remark,
              };
            }),
          },
        },
        MountainToMtFacility: {
          createMany: {
            data: (MountainToMtFacility || []).map((info) => {
              const timeTo = toN(info.timeTo);
              const distanceTo = toN(info.distanceTo);
              const timeFrom = toN(info.timeFrom);
              const distanceFrom = toN(info.distanceFrom);

              return {
                mountainId: info.mountainId,
                timeTo,
                distanceTo,
                timeFrom,
                distanceFrom: distanceFrom || distanceTo,
                remark: info.remark,
              };
            }),
          },
        },

        BusinessPeriod: {
          createMany: {
            data: (BusinessPeriod || []).map((o) => ({
              year: o.year === '' ? null : o.year,
              start: o.start === '' ? null : o.start,
              end: o.end === '' ? null : o.end,
            })),
          },
        },
        Area: {
          connect: {
            id: input.data.mtAreaId,
          },
        },
      },

      select: {
        id: true,
        MtFacilityToPhoto: {select: {Photo: {select: {id: true}}}},
      },
    });

    return createOneMtFacility;
  }),
  update: protectedProcedure.input(MtFacilityEditSchema).mutation(async ({ctx, input}) => {
    const {TrailheadToMtFacility, MountainToMtFacility, MtFacilityTypeIds, RsvMethodIds, PayMethodIds, BusinessPeriod} = input.data;
    const {images} = input.data;
    // imagesの順番を逆にする todo:なぜか順番が逆になってしまうので、ここで逆にしているorder持った方がいい
    const reversedImages = images ? [...images].reverse() : [];
    const cleanedData = polishMtFacility(input.data);

    const result = await ctx.prisma.$transaction(async (prisma) => {
      // 既存画像が消された場合、DBからも消す
      await prisma.mtFacilityToPhoto.deleteMany({
        where: {
          mtFacilityId: input.id,
          Photo: {
            id: {
              notIn: (images || []).map((v) => v.dbPhotoId || 0),
            },
          },
        },
      });

      // リレーション一旦削除
      const deleted = await ctx.prisma.mtFacility.update({
        where: {id: input.id},
        data: {
          MtFacilityToMtFacilityType: {
            deleteMany: {},
          },
          MtFacilityToRsvMethod: {
            deleteMany: {},
          },
          MtFacilityToPayMethod: {
            deleteMany: {},
          },
          TrailheadToMtFacility: {
            deleteMany: {},
          },
          MountainToMtFacility: {
            deleteMany: {},
          },
          BusinessPeriod: {
            deleteMany: {},
          },
        },
      });
      const createOneMtFacility = await ctx.prisma.mtFacility.update({
        where: {id: input.id},
        data: {
          ...cleanedData,
          docomo: toN(input.data.docomo),
          au: toN(input.data.au),
          softbank: toN(input.data.softbank),
          rakuten: toN(input.data.rakuten),
          postalCode: toN(input.data.postalCode.replace(/-/g, '')),
          listElevation: toN(input.data.listElevation),
          tStay: booleanNullToInt(input.data.tStay),
          tCafeSpace: booleanNullToInt(input.data.tCafeSpace),
          tTent: booleanNullToInt(input.data.tTent),
          tShop: booleanNullToInt(input.data.tShop),
          tToilet: booleanNullToInt(input.data.tToilet),
          tBathSink: booleanNullToInt(input.data.tBathSink),
          tChangingRoom: booleanNullToInt(input.data.tChangingRoom),
          tDryRoom: booleanNullToInt(input.data.tDryRoom),
          tBath: booleanNullToInt(input.data.tBath),
          tWave: booleanNullToInt(input.data.tWave),
          tWifi: booleanNullToInt(input.data.tWifi),
          tPublicPhone: booleanNullToInt(input.data.tPublicPhone),
          tKitchen: booleanNullToInt(input.data.tKitchen),
          tTalkRoom: booleanNullToInt(input.data.tTalkRoom),
          tOther: booleanNullToInt(input.data.tOther),

          MtFacilityToPhoto: {
            create: (reversedImages || [])
              .filter((v) => !v.dbPhotoId)
              .map((image) => ({
                Photo: {
                  create: {
                    title: image.title,
                    thumbnail: image.thumbnail,
                    original: image.original,
                    type: image.type,
                    width: image.width,
                    height: image.height,
                  },
                },
              })),
          },
          MtFacilityToMtFacilityType: {
            createMany: {
              data: (MtFacilityTypeIds || []).map((mtFacilityTypeId) => ({
                mtFacilityTypeId,
              })),
            },
          },
          MtFacilityToRsvMethod: {
            createMany: {
              data: (RsvMethodIds || []).map((id) => ({
                rsvMethodId: id,
              })),
            },
          },
          MtFacilityToPayMethod: {
            createMany: {
              data: (PayMethodIds || []).map((id) => ({
                payMethodId: id,
              })),
            },
          },
          TrailheadToMtFacility: {
            createMany: {
              data: (TrailheadToMtFacility || []).map((info) => {
                const timeTo = toN(info.timeTo);
                const distanceTo = toN(info.distanceTo);
                const timeFrom = toN(info.timeFrom);
                const distanceFrom = toN(info.distanceFrom);

                return {
                  trailheadId: info.trailheadId,
                  timeTo,
                  distanceTo,
                  timeFrom,
                  distanceFrom: distanceFrom || distanceTo,
                  remark: info.remark,
                };
              }),
            },
          },
          MountainToMtFacility: {
            createMany: {
              data: (MountainToMtFacility || []).map((info) => {
                const timeTo = toN(info.timeTo);
                const distanceTo = toN(info.distanceTo);
                const timeFrom = toN(info.timeFrom);
                const distanceFrom = toN(info.distanceFrom);

                return {
                  mountainId: info.mountainId,
                  timeTo,
                  distanceTo,
                  timeFrom,
                  distanceFrom: distanceFrom || distanceTo,
                  remark: info.remark,
                };
              }),
            },
          },
          BusinessPeriod: {
            createMany: {
              data: (BusinessPeriod || []).map((o) => ({
                year: o.year === '' ? null : o.year,
                start: o.start === '' ? null : o.start,
                end: o.end === '' ? null : o.end,
              })),
            },
          },
          Area: {
            connect: {
              id: input.data.mtAreaId,
            },
          },
        },

        select: {
          id: true,
          MtFacilityToPhoto: {select: {Photo: {select: {id: true}}}},
        },
      });

      return {deleted, createOneMtFacility};
    });

    return result;
  }),

  findUniqueByDetail: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
    const findUniqueMtFacility = await ctx.prisma.mtFacility.findUnique({
      where: {id: input.id},
      select: {
        id: true,
        name: true,
        nameKana: true,
        lat: true,
        lng: true,
        remark: true,
        listTimeRemark: true,
        listCapacityHut: true,
        listCapacityTent: true,
        listFeeHut: true,
        listFeeHut2: true,
        listFeeTent: true,
        listTelOffice: true,
        listTelLocal: true,
        listHp: true,
        listElevation: true,
        docomo: true,
        au: true,
        softbank: true,
        rakuten: true,
        listConnectionRemark: true,
        tStay: true,
        tCafeSpace: true,
        tTent: true,
        tShop: true,
        tToilet: true,
        tBathSink: true,
        tChangingRoom: true,
        tDryRoom: true,
        tBath: true,
        tWave: true,
        tWifi: true,
        tPublicPhone: true,
        tKitchen: true,
        tTalkRoom: true,
        tOther: true,
        prefecture: true,
        outTFlag: true,
        outTCleanRating: true,
        outTRemark: true,
        inTFlag: true,
        inTCleanRating: true,
        inTRemark: true,
        bathSinkFlag: true,
        bathSinkCleanRating: true,
        bathSinkRemark: true,
        talkRoomFlag: true,
        talkRoomCleanRating: true,
        talkRoomRemark: true,
        dryRoomFlag: true,
        dryRoomCleanRating: true,
        dryRoomRemark: true,
        cafeSpaceRoomFlag: true,
        cafeSpaceRoomCleanRating: true,
        cafeSpaceRoomRemark: true,
        BusinessPeriod: {select: {year: true, start: true, end: true}},
        MtFacilityToPhoto: {
          select: {
            Photo: {
              select: {
                id: true,
                original: true,
                thumbnail: true,
                type: true,
                width: true,
                height: true,
                uploadStatus: true,
                title: true,
              },
            },
          },
        },
        MtFacilityToMtFacilityType: {
          select: {
            MtFacilityType: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        MtFacilityToRsvMethod: {
          select: {
            RsvMethod: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        MtFacilityToPayMethod: {
          select: {
            PayMethod: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        MountainToMtFacility: {
          select: {
            mountainId: true,
            mtFacilityId: true,
            timeTo: true,
            distanceTo: true,
            timeFrom: true,
            distanceFrom: true,
            Mountain: {
              select: {name: true},
            },
            MtFacility: {
              select: {name: true},
            },
          },
        },
        TrailheadToMtFacility: {
          select: {
            trailheadId: true,
            mtFacilityId: true,
            timeTo: true,
            distanceTo: true,
            timeFrom: true,
            distanceFrom: true,
            Trailhead: {
              select: {name: true},
            },
            MtFacility: {
              select: {name: true},
            },
          },
        },
      },
    });
    return findUniqueMtFacility;
  }),
  findFirst: publicProcedure.input(MtFacilityFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstMtFacility = await ctx.prisma.mtFacility.findFirst(input);
    return findFirstMtFacility;
  }),

  findUniqueByEdit: publicProcedure.input(FindUniqueByEditSchema).query(async ({ctx, input}) => {
    const findUniqueMtFacility = await ctx.prisma.mtFacility.findUnique({
      where: {id: input.id},
      select: {
        name: true,
        nameKana: true,
        postalCode: true,
        prefecture: true,
        address1: true,
        address2: true,
        address3: true,
        lat: true,
        lng: true,
        MtFacilityToMtFacilityType: {select: {mtFacilityTypeId: true}},
        MtFacilityToPayMethod: {select: {payMethodId: true}},
        MtFacilityToRsvMethod: {select: {rsvMethodId: true}},
        Area: {select: {id: true, name: true}},
        docomo: true,
        au: true,
        softbank: true,
        rakuten: true,
        remark: true,
        inTRemark: true,
        outTRemark: true,
        bathSinkRemark: true,
        talkRoomRemark: true,
        dryRoomRemark: true,
        cafeSpaceRoomRemark: true,
        bashRoomRemark: true,
        listTimeRemark: true,
        listTelOffice: true,
        listTelLocal: true,
        listHp: true,
        listCapacityTent: true,
        listCapacityHut: true,
        listConnectionRemark: true,
        listFeeTent: true,
        listFeeHut: true,
        listFeeHut2: true,
        tStay: true,
        tCafeSpace: true,
        tTent: true,
        tShop: true,
        tToilet: true,
        tBathSink: true,
        tChangingRoom: true,
        tDryRoom: true,
        tBath: true,
        tWave: true,
        tWifi: true,
        tPublicPhone: true,
        tKitchen: true,
        tTalkRoom: true,
        tOther: true,
        MountainToMtFacility: true,
        TrailheadToMtFacility: true,
        BusinessPeriod: true,
        areaId: true,
        listElevation: true,
        MtFacilityToPhoto: {
          select: {
            Photo: {
              select: {
                id: true,
                original: true,
                thumbnail: true,
                type: true,
                width: true,
                height: true,
              },
            },
          },
        },
      },
    });
    if (!findUniqueMtFacility) throw new Error('findUniqueMtFacility not found');

    return findUniqueMtFacility;
  }),

  findMany: publicProcedure.input(MtFacilityFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyMtFacility = await ctx.prisma.mtFacility.findMany(input);
    return findManyMtFacility;
  }),
  findManyRaw: publicProcedure.input(MtFacilityFindManyRawSchema).query(async ({ctx, input}) => {
    // 条件取得
    const {
      from: {lat, lng},
      limit,
    } = input;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;

    // 絞り込み
    const [whereClause, bindValues] = generateSQLWhereClause(input, 5);
    // 並び順
    const orderClause = generateSQLOrderClause(input);

    // SQL作成
    const stringQuery = ctx.prisma.$queryRawUnsafe<MtFacilityGetQueryRawType[]>(
      MtFacilityGetManySql(whereClause, orderClause),
      lat,
      lng,
      limit,
      cursor,
      ...bindValues
    );
    const countQuery = ctx.prisma.$queryRawUnsafe<{count: string}[]>(
      MtFacilityGetManySql(whereClause, orderClause, true),
      lat,
      lng,
      limit,
      cursor,
      ...bindValues
    );

    // idsとcountを取得
    const [posts, countResult] = await Promise.all([stringQuery, countQuery]);
    const count = Number(countResult[0].count);
    const ids = posts.map((post) => post.MtFacility_id).flat();

    // 別途必要な情報を取得
    const mtf = await getMtf(ctx, ids);
    // idsの順番を保持したまま、postsに追加
    const mtfMap = new Map(mtf.map((item) => [item.id, item])); // mtfをMapに変換
    // idsの順番を保持したまま、postsに追加
    const sorted = ids.map((id) => mtfMap.get(id)!);

    return {
      posts: transformTrailheads(sorted),
      count,
      nextCursor: nextCursor < count ? nextCursor : null,
    };
  }),

  updateSpecificItem: protectedProcedure.input(UpdateSpecificItemSchema).mutation(async ({ctx, input}) => {
    const updateManyMtFacility = await ctx.prisma.mtFacility.updateMany({
      data: {
        [input.flag?.columnName]: toN(input.flag.value.toString(), {zero: true}),
        [input.remark.columnName]: input.remark.value,
      },
      where: {
        id: input.mtFacilityId,
      },
    });
    return updateManyMtFacility;
  }),
});
