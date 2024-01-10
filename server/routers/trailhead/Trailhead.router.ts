import {protectedProcedure, publicProcedure, t} from 'server/trpc';
import {polishTrailhead} from 'generated/extra-fields';
import {toN} from 'server/functions/toN';

import {z} from 'zod';
import TrailheadFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/TrailheadFindFirstArgsSchema';
import TrailheadFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/TrailheadFindManyArgsSchema';
import {TrailheadCreateSchema} from './schemas/createOneTrailhead.schema';
import {TrailheadEditSchema} from './schemas/updateOneTrailhead.schema';

export const trailheadsRouter = t.router({
  findUniqueByEdit: publicProcedure.input(z.object({id: z.number()})).query(async ({ctx, input}) => {
    const findUniqueMountain = await ctx.prisma.trailhead.findUnique({
      where: {id: input.id},
      select: {
        id: true,
        areaId: true,
        name: true,
        nameKana: true,
        intro: true,
        elevation: true,
        lat: true,
        lng: true,
        postalCode: true,
        prefecture: true,
        address1: true,
        address2: true,
        address3: true,
        lastConbiniName: true,
        lastConbiniNameKana: true,
        lastConbiniLat: true,
        lastConbiniLng: true,
        popularRating: true,
        hpRating: true,
        myCarReg: true,
        intensity: true,
        view: true,
        toilet: true,
        vendingMachine: true,
        store: true,
        remark: true,
        roadblockInfo: true,
        roadblockStart: true,
        roadblockEnd: true,

        Parking: {
          select: {
            id: true,
            trailheadId: true,
            fromMethod: true,
            name: true,
            nameKana: true,
            postalCode: true,
            prefecture: true,
            address1: true,
            address2: true,
            address3: true,
            mapLink: true,
            methodToTh: true,
            timeToTrailhead: true,
            distanceToTrailhead: true,
            feeToTrailhead: true,
            capacity: true,
            dirtRoad: true,
            feeFree: true,
            feeStr: true,
            notes: true,
            lat: true,
            lng: true,
          },
        },
        TrailheadRouteGroup: {
          select: {
            id: true,
            type: true,
            trailheadId: true,
            remark: true,
            routes: {
              select: {
                id: true,
                name: true,
                type: true,
                time: true,
                methodType: true,
                methodName: true,
                payment: true,
                order: true,
                routeGroupId: true,
                url: true,
              },
            },
          },
        },
        TrailheadToPhoto: {
          select: {
            id: true,
            trailheadId: true,
            Photo: {
              select: {
                id: true,
                title: true,
                thumbnail: true,
                original: true,
                type: true,
                width: true,
                height: true,
              },
            },
          },
        },
        MountainToTrailhead: {
          select: {
            id: true,
            mountainId: true,
            trailheadId: true,
            uphillTime: true,
            uphillDistance: true,
            downhillTime: true,
            downhillDistance: true,
          },
        },
        TrailheadToMtFacility: {
          select: {
            id: true,
            mtFacilityId: true,
            trailheadId: true,
            timeTo: true,
            distanceTo: true,
            timeFrom: true,
            distanceFrom: true,
            remark: true,
          },
        },
      },
    });
    if (!findUniqueMountain) throw new Error('findUniqueMountain not found');

    return findUniqueMountain;
  }),

  create: protectedProcedure.input(TrailheadCreateSchema).mutation(async ({ctx, input}) => {
    const {MountainToTrailhead, TrailheadToMtFacility} = input.data;
    const {images} = input.data;
    // imagesの順番を逆にする todo:なぜか順番が逆になってしまうので、ここで逆にしているorder持った方がいい
    const reversedImages = images?.reverse();

    const cleanedData = polishTrailhead(input.data);

    const createOneTrailhead = await ctx.prisma.trailhead.create({
      select: {
        id: true,
        TrailheadToPhoto: {
          select: {
            Photo: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      data: {
        ...cleanedData,
        nameKana: '',
        postalCode: toN(input.data.postalCode.replace(/-/g, '')),
        elevation: toN(input.data.elevation),
        myCarReg: toN(input.data.myCarReg),
        toilet: toN(input.data.toilet),
        vendingMachine: toN(input.data.vendingMachine),
        store: toN(input.data.store),

        MountainToTrailhead: {
          createMany: {
            data: (MountainToTrailhead || []).map((info) => {
              const uphillTime = toN(info.uphillTime);
              const downhillTime = toN(info.downhillTime);
              const uphillDistance = toN(info.uphillDistance);
              const downhillDistance = toN(info.downhillDistance);

              return {
                mountainId: Number(info.mountainId),
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
        Parking: {
          create: (input.data.Parking || []).map((parking) => ({
            name: parking.name,
            nameKana: parking.nameKana,
            fromMethod: 'car',
            mapLink: parking.mapLink,
            timeToTrailhead: toN(parking.timeToTrailhead),
            distanceToTrailhead: toN(parking.distanceToTrailhead),
            feeToTrailhead: toN(parking.feeToTrailhead),
            capacity: toN(parking.capacity),
            methodToTh: parking.methodToTh,
            dirtRoad: parking.dirtRoad,
            feeFree: parking.feeFree,
            feeStr: parking.feeStr,
            notes: parking.notes,
          })),
        },
        TrailheadToPhoto: {
          create: (reversedImages || []).map((image) => ({
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
        Area: {connect: {id: input.data.mtAreaId}},
        TrailheadRouteGroup: {
          create: (input.data.TrailheadRouteGroup || []).map((routeGroup) => ({
            type: routeGroup.type,
            remark: routeGroup.remark,
            routes: {
              create: routeGroup.routes.map((route) => ({
                name: route.name,
                type: route.type,
                time: toN(route.time, {zero: true}),
                methodType: route.methodType === '' ? null : route.methodType,
                methodName: route.methodName === '' ? null : route.methodName,
                payment: toN(route.payment),
                order: route.order,
                url: route.url === '' ? null : route.url,
              })),
            },
          })),
        },
        TrailheadToMtFacility: {
          create: (TrailheadToMtFacility || []).map((info) => ({
            mtFacilityId: Number(info.mtFacilityId),
            timeTo: toN(info.timeTo),
            distanceTo: toN(info.distanceTo),
            timeFrom: toN(info.timeFrom),
            distanceFrom: info.distanceFrom ? toN(info.distanceFrom) : toN(info.distanceTo),
            remark: info.remark,
          })),
        },
      },
    });

    return createOneTrailhead;
  }),
  update: protectedProcedure.input(TrailheadEditSchema).mutation(async ({ctx, input}) => {
    const {MountainToTrailhead, TrailheadRouteGroup, TrailheadToMtFacility} = input.data;
    const {images} = input.data;
    // imagesの順番を逆にする todo:なぜか順番が逆になってしまうので、ここで逆にしているorder持った方がいい
    const reversedImages = images ? [...images].reverse() : [];

    const cleanedData = polishTrailhead(input.data);

    const result = await ctx.prisma.$transaction(async (prisma) => {
      // 既存画像が消された場合、DBからも消す
      await prisma.trailheadToPhoto.deleteMany({
        // これこうなんじゃprisma
        where: {
          trailheadId: input.id,
          Photo: {
            id: {
              notIn: (images || []).map((v) => v.dbPhotoId || 0),
            },
          },
        },
      });

      await ctx.prisma.trailheadRoute.deleteMany({
        where: {
          TrailheadRouteGroup: {
            trailheadId: input.id,
          },
        },
      });

      await ctx.prisma.trailheadRouteGroup.deleteMany({
        where: {
          trailheadId: input.id,
        },
      });

      // リレーションを削除
      await ctx.prisma.trailhead.update({
        where: {id: input.id},
        data: {
          MountainToTrailhead: {
            deleteMany: {},
          },
          Parking: {
            deleteMany: {},
          },

          TrailheadRouteGroup: {
            deleteMany: {},
          },
          TrailheadToMtFacility: {
            deleteMany: {},
          },
          areaId: null,
        },
      });

      const createOneTrailhead = await ctx.prisma.trailhead.update({
        select: {
          id: true,
          TrailheadToPhoto: {
            select: {
              Photo: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
        where: {id: input.id},
        data: {
          ...cleanedData,
          nameKana: '',
          postalCode: toN(input.data.postalCode.replace(/-/g, '')),
          elevation: toN(input.data.elevation),
          myCarReg: toN(input.data.myCarReg),
          toilet: toN(input.data.toilet),
          vendingMachine: toN(input.data.vendingMachine),
          store: toN(input.data.store),

          MountainToTrailhead: {
            createMany: {
              data: (MountainToTrailhead || []).map((info) => {
                const uphillTime = toN(info.uphillTime);
                const downhillTime = toN(info.downhillTime);
                const uphillDistance = toN(info.uphillDistance);
                const downhillDistance = toN(info.downhillDistance);

                return {
                  mountainId: Number(info.mountainId),
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
          Parking: {
            create: (input.data.Parking || []).map((parking) => ({
              name: parking.name,
              nameKana: parking.nameKana,
              fromMethod: 'car',
              mapLink: parking.mapLink,
              timeToTrailhead: toN(parking.timeToTrailhead),
              distanceToTrailhead: toN(parking.distanceToTrailhead),
              feeToTrailhead: toN(parking.feeToTrailhead),
              capacity: toN(parking.capacity),
              methodToTh: parking.methodToTh,
              dirtRoad: parking.dirtRoad,
              feeFree: parking.feeFree,
              feeStr: parking.feeStr,
              notes: parking.notes,
            })),
          },
          TrailheadToPhoto: {
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
          Area: {connect: {id: input.data.mtAreaId}},
          TrailheadRouteGroup: {
            create: (TrailheadRouteGroup || []).map((routeGroup) => ({
              type: routeGroup.type,
              remark: routeGroup.remark,
              routes: {
                create: routeGroup.routes.map((route) => ({
                  name: route.name,
                  type: route.type,
                  time: toN(route.time, {zero: true}),
                  methodType: route.methodType === '' ? null : route.methodType,
                  methodName: route.methodName === '' ? null : route.methodName,
                  payment: toN(route.payment),
                  order: route.order,
                  url: route.url === '' ? null : route.url,
                })),
              },
            })),
          },
          TrailheadToMtFacility: {
            create: (TrailheadToMtFacility || []).map((info) => ({
              mtFacilityId: Number(info.mtFacilityId),
              timeTo: toN(info.timeTo),
              distanceTo: toN(info.distanceTo),
              timeFrom: toN(info.timeFrom),
              distanceFrom: info.distanceFrom ? toN(info.distanceFrom) : toN(info.distanceTo),
              remark: info.remark,
            })),
          },
        },
      });

      return createOneTrailhead;
    });
    return result;
  }),

  findFirst: publicProcedure.input(TrailheadFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstTrailhead = await ctx.prisma.trailhead.findFirst(input);
    return findFirstTrailhead;
  }),

  findMany: publicProcedure.input(TrailheadFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyTrailhead = await ctx.prisma.trailhead.findMany(input);
    return findManyTrailhead;
  }),
});
