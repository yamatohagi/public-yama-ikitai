/* eslint-disable import/no-named-as-default */
import {protectedProcedure, publicProcedure, t} from 'server/trpc';
import {NMountainFindManySchema} from 'server/schemas/findManyMountain.schema';
import type {Prisma} from '@prisma/client';
import {toN} from 'server/functions/toN';
import {polishMountain} from 'generated/extra-fields';
import {z} from 'zod';
import MountainFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainFindFirstArgsSchema';
import MountainFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainFindManyArgsSchema';

import {mountainFindFirstUseCase, mountainFindManyUseCase} from './useCase';

import {CheckAlreadySchema} from './schemas/checkAlreadySchema';

import {UpsertRequestSchema} from './schemas/UpsertRequestSchema';
import {UpsertApprovalSchema} from './schemas';

export const mountainsRouter = t.router({
  findUniqueByEdit: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
    const findUniqueMountain = await ctx.prisma.mountain.findUnique({
      where: {id: input.id},
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
        areaId: true,
        name: true,
        nameKana: true,
        postalCode: true,
        prefecture: true,
        address1: true,
        address2: true,
        address3: true,
        lat: true,
        lng: true,
        hyakumeizanStatus: true,
        nihyakumeizanStatus: true,
        stay0n1d: true,
        stay1n2d: true,
        stay2n3d: true,
        stay3n4d: true,

        elevation: true,
        appealPoint: true,
        description: true,
        MountainToTrailhead: {
          select: {
            trailheadId: true,
            uphillTime: true,
            uphillDistance: true,
            downhillTime: true,
            downhillDistance: true,
          },
        },
        MountainToMtFacility: {
          select: {
            mtFacilityId: true,
            timeFrom: true,
            timeTo: true,
            distanceFrom: true,
            distanceTo: true,
          },
        },

        Area: {select: {id: true}},
        MountainToPhoto: {
          where: {
            NOT: {
              viewTo: true,
            },
          },
          select: {
            labelTop: true,
            labelLeft: true,
            Mountain: {
              select: {
                id: true,
                name: true,
              },
            },
            Photo: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                original: true,
                width: true,
                height: true,
                type: true,
                MountainToPhoto: {
                  where: {
                    viewTo: true,
                  },
                  select: {
                    labelTop: true,
                    labelLeft: true,
                    viewTo: true,
                    Photo: {
                      select: {
                        original: true,
                        width: true,
                        height: true,
                      },
                    },
                    Mountain: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!findUniqueMountain) throw new Error('findUniqueMountain not found');

    return findUniqueMountain;
  }),

  upsertApproval: protectedProcedure.input(UpsertApprovalSchema).mutation(async ({ctx, input}) => {
    const {MtToThInfos, MountainToMtFacility} = input.data;
    const cleanedData = polishMountain(input.data);
    const {images} = input.data;
    // imagesの順番を逆にする todo:なぜか順番が逆になってしまうので、ここで逆にしているorder持った方がいい
    const reversedImages = images ? [...images].reverse() : [];

    const data: Prisma.MountainCreateInput = {
      ...cleanedData,
      approvalAt: new Date(),
      postalCode: toN(input.data.postalCode.replace(/-/g, '')),
      elevation: toN(input.data.elevation),
      Area: {connect: {id: input.data.mtAreaId}},
      MountainToPhoto: {
        create: reversedImages.map((image) =>
          image.dbPhotoId
            ? {Photo: {connect: {id: image.dbPhotoId}}} // dbPhotoIdが存在する場合はconnect、そうでない場合はcreate
            : {
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
              }
        ),
      },
      MountainToTrailhead: {
        createMany: {
          data: (MtToThInfos || []).map((info) => {
            const uphillTime = toN(info.uphillTime);
            const downhillTime = toN(info.downhillTime);
            const uphillDistance = toN(info.uphillDistance);
            const downhillDistance = toN(info.downhillDistance);

            return {
              trailheadId: Number(info.trailheadId),
              uphillTime,
              uphillDistance,
              downhillTime,
              downhillDistance: downhillDistance || uphillDistance,
              upDownTime: uphillTime && downhillTime ? uphillTime + downhillTime : null,
              upDownDistance: uphillDistance && downhillDistance ? uphillDistance + downhillDistance : null,
            };
          }),
        },
      },
      MountainToMtFacility: {
        createMany: {
          data: (MountainToMtFacility || []).map((v) => {
            const timeTo = toN(v.timeTo);
            const distanceTo = toN(v.distanceTo);
            const timeFrom = toN(v.timeFrom);
            const distanceFrom = toN(v.distanceFrom);
            return {
              mtFacilityId: Number(v.mtFacilityId),
              timeTo,
              distanceTo: distanceTo || distanceFrom,
              timeFrom,
              distanceFrom,
              remark: v.remark,
            };
          }),
        },
      },
    };
    const result = await ctx.prisma.$transaction(async (prisma) => {
      // 画像のリレーションを一旦削除
      await prisma.mountainToPhoto.deleteMany({
        where: {
          mountainId: input.originId,
        },
      });
      // リレーション一旦削除
      const deleted = await prisma.mountain.update({
        where: {id: input.originId},
        data: {
          MountainToTrailhead: {
            deleteMany: {},
          },
          MountainToMtFacility: {
            deleteMany: {},
          },
        },
      });

      const createOneMountain = await prisma.mountain.update({
        where: {id: input.originId},
        select: {
          id: true,
          MountainToPhoto: {
            select: {
              Photo: {
                select: {
                  id: true,
                  original: true,
                  postId: true,
                  width: true,
                  height: true,
                },
              },
            },
          },
        },
        data,
      });

      // 特徴テーブルがあれば更新、なければ作成
      await prisma.mountainFeature.upsert({
        where: {mountainId: createOneMountain.id},
        update: {},
        create: {mountainId: createOneMountain.id},
      });

      // 完了したら承認用rowを削除
      if (input.id) await prisma.mountain.delete({where: {id: input.id}}); // idがある場合は削除,ない場合は新規作成なので何もしない

      return {
        createOneMountain,
        deleted,
      };
    });

    return result;
  }),

  upsertRequest: protectedProcedure.input(UpsertRequestSchema).mutation(async ({ctx, input}) => {
    const {MtToThInfos, MountainToMtFacility} = input.data;
    const cleanedData = polishMountain(input.data);
    const {images} = input.data;
    // imagesの順番を逆にする todo:なぜか順番が逆になってしまうので、ここで逆にしているorder持った方がいい
    const reversedImages = images ? [...images].reverse() : [];

    const data: Prisma.MountainCreateInput = {
      ...cleanedData,
      postalCode: toN(input.data.postalCode.replace(/-/g, '')),
      elevation: toN(input.data.elevation),
      originId: input.originalId,
      applicationAt: new Date(),
      Area: {connect: {id: input.data.mtAreaId}},
      MountainToPhoto: {
        create: reversedImages.map((image) =>
          image.dbPhotoId
            ? {Photo: {connect: {id: image.dbPhotoId}}} // dbPhotoIdが存在する場合はconnect、そうでない場合はcreate
            : {
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
              }
        ),
      },
      MountainToTrailhead: {
        createMany: {
          data: (MtToThInfos || []).map((info) => {
            const uphillTime = toN(info.uphillTime);
            const downhillTime = toN(info.downhillTime);
            const uphillDistance = toN(info.uphillDistance);
            const downhillDistance = toN(info.downhillDistance);

            return {
              trailheadId: Number(info.trailheadId),
              uphillTime,
              uphillDistance,
              downhillTime,
              downhillDistance: downhillDistance || uphillDistance,
              upDownTime: uphillTime && downhillTime ? uphillTime + downhillTime : null,
              upDownDistance: uphillDistance && downhillDistance ? uphillDistance + downhillDistance : null,
            };
          }),
        },
      },
      MountainToMtFacility: {
        createMany: {
          data: (MountainToMtFacility || []).map((v) => {
            const timeTo = toN(v.timeTo);
            const distanceTo = toN(v.distanceTo);
            const timeFrom = toN(v.timeFrom);
            const distanceFrom = toN(v.distanceFrom);
            return {
              mtFacilityId: Number(v.mtFacilityId),
              timeTo,
              distanceTo: distanceTo || distanceFrom,
              timeFrom,
              distanceFrom,
              remark: v.remark,
            };
          }),
        },
      },
    };
    const result = await ctx.prisma.$transaction(async (prisma) => {
      const createOneMountain = await prisma.mountain.create({
        select: {
          id: true,
          MountainToPhoto: {
            select: {
              Photo: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
        data,
      });

      const MountainFeature = await prisma.mountainFeature.create({
        data: {
          mountainId: createOneMountain.id,
        },
      });

      return {
        createOneMountain,
        MountainFeature,
      };
    });

    return result;
  }),

  findFirst: publicProcedure.input(MountainFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findManyMountainResult = await mountainFindFirstUseCase({ctx, input});

    return findManyMountainResult;
  }),

  findManyOld: publicProcedure.input(MountainFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyMountain = await ctx.prisma.mountain.findMany(input);
    return findManyMountain;
  }),
  findMany: publicProcedure.input(NMountainFindManySchema).query(async ({ctx, input}) => {
    const findManyMountainResult = await mountainFindManyUseCase({ctx, input});

    return findManyMountainResult;
  }),
  checkAlready: publicProcedure.input(CheckAlreadySchema).query(async ({ctx, input}) => {
    const alreadyMt = await ctx.prisma.mountain.findFirst({
      where: {
        AND: [
          {
            lat: input.lat,
            lng: input.lng,
            name: input.name,
          },

          {
            approvalAt: {
              not: null,
            },
          },
          input.excludeId
            ? {
                NOT: {
                  id: input.excludeId,
                },
              }
            : {},
        ],
      },
    });
    return alreadyMt;
  }),
});
