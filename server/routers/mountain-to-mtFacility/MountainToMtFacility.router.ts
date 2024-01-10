// import {
// MountainToMtFacilityCreateArgsSchema,
// MountainToMtFacilityDeleteManyArgsSchema,
// MountainToMtFacilityFindFirstArgsSchema,
// MountainToMtFacilityFindManyArgsSchema,
// } from 'generated/schema/zod';
import {publicProcedure, t} from 'server/trpc';
import {MountainToMtFacilityFindManyByMtDetailArgsSchema} from './schemas/mountainToMtFacilityFindManyByMtDetailArgsSchema';

export const mountaintomtfacilitiesRouter = t.router({
  // createOne: protectedProcedure.input(MountainToMtFacilityCreateArgsSchema).mutation(async ({ctx, input}) => {
  //   const createOneMountainToMtFacility = await ctx.prisma.mountainToMtFacility.create(input);
  //   return createOneMountainToMtFacility;
  // }),
  // deleteMany: protectedProcedure.input(MountainToMtFacilityDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteManyMountainToMtFacility = await ctx.prisma.mountainToMtFacility.deleteMany(input);
  //   return deleteManyMountainToMtFacility;
  // }),
  // findFirst: protectedProcedure.input(MountainToMtFacilityFindFirstArgsSchema).query(async ({ctx, input}) => {
  //   const findFirstMountainToMtFacility = await ctx.prisma.mountainToMtFacility.findFirst(input);
  //   return findFirstMountainToMtFacility;
  // }),
  // findMany: protectedProcedure.input(MountainToMtFacilityFindManyArgsSchema).query(async ({ctx, input}) => {
  //   const findManyMountainToMtFacility = await ctx.prisma.mountainToMtFacility.findMany(input);
  //   return findManyMountainToMtFacility;
  // }),
  findManyByMtDetail: publicProcedure.input(MountainToMtFacilityFindManyByMtDetailArgsSchema).query(async ({ctx, input}) => {
    const findManyMountainToMtFacility = await ctx.prisma.mountainToMtFacility.findMany({
      where: {mountainId: input.mountainId},
      select: {
        timeTo: true,
        distanceTo: true,
        timeFrom: true,
        distanceFrom: true,
        MtFacility: {
          select: {
            id: true,
            name: true,
            remark: true,
          },
        },
      },
      orderBy: {MtFacility: {createdAt: 'asc'}},
    });
    return findManyMountainToMtFacility;
  }),
});
