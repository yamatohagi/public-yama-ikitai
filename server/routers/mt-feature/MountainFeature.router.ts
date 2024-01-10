import {publicProcedure, t} from 'server/trpc';

// import {
//   MountainFeatureAggregateArgsSchema,
//   MountainFeatureCreateArgsSchema,
//   MountainFeatureCreateManyArgsSchema,
//   MountainFeatureDeleteArgsSchema,
//   MountainFeatureDeleteManyArgsSchema,
//   MountainFeatureFindFirstArgsSchema,
//   MountainFeatureFindManyArgsSchema,
//   MountainFeatureFindUniqueArgsSchema,
//   MountainFeatureGroupByArgsSchema,
//   MountainFeatureUpdateArgsSchema,
//   MountainFeatureUpdateManyArgsSchema,
//   MountainFeatureUpsertArgsSchema,
// } from 'generated/schema/zod';

import {MountainFeatureFindManyWithPhotoSchema} from './schemas/getUseMapApiRouteSchema';

export const mountainFeaturesRouter = t.router({
  // aggregate: protectedProcedure.input(MountainFeatureAggregateArgsSchema).query(async ({ctx, input}) => {
  //   const aggregateMountainFeature = await ctx.prisma.mountainFeature.aggregate(input);
  //   return aggregateMountainFeature;
  // }),
  // createMany: protectedProcedure.input(MountainFeatureCreateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const createManyMountainFeature = await ctx.prisma.mountainFeature.createMany(input);
  //   return createManyMountainFeature;
  // }),
  // createOne: protectedProcedure.input(MountainFeatureCreateArgsSchema).mutation(async ({ctx, input}) => {
  //   const createOneMountainFeature = await ctx.prisma.mountainFeature.create(input);
  //   return createOneMountainFeature;
  // }),
  // deleteMany: protectedProcedure.input(MountainFeatureDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteManyMountainFeature = await ctx.prisma.mountainFeature.deleteMany(input);
  //   return deleteManyMountainFeature;
  // }),
  // deleteOne: protectedProcedure.input(MountainFeatureDeleteArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteOneMountainFeature = await ctx.prisma.mountainFeature.delete(input);
  //   return deleteOneMountainFeature;
  // }),
  // findFirst: protectedProcedure.input(MountainFeatureFindFirstArgsSchema).query(async ({ctx, input}) => {
  //   const findFirstMountainFeature = await ctx.prisma.mountainFeature.findFirst(input);
  //   return findFirstMountainFeature;
  // }),

  // findMany: protectedProcedure.input(MountainFeatureFindManyArgsSchema).query(async ({ctx, input}) => {
  //   const findManyMountainFeature = await ctx.prisma.mountainFeature.findMany(input);
  //   return findManyMountainFeature;
  // }),
  findManyPhotoHashtag: publicProcedure.input(MountainFeatureFindManyWithPhotoSchema).query(async ({ctx, input}) => {
    const findManyMountainFeature = await ctx.prisma.mountainFeature.findFirst({
      where: {
        mountainId: input.mountainId,
      },
      include: {
        Mountain: {select: {name: true}},
      },
    });
    return findManyMountainFeature;
  }),

  // findUnique: protectedProcedure.input(MountainFeatureFindUniqueArgsSchema).query(async ({ctx, input}) => {
  //   const findUniqueMountainFeature = await ctx.prisma.mountainFeature.findUnique(input);
  //   return findUniqueMountainFeature;
  // }),

  // groupBy: protectedProcedure.input(MountainFeatureGroupByArgsSchema).query(async ({ctx, input}) => {
  //   const groupByMountainFeature = await ctx.prisma.mountainFeature.groupBy({
  //     where: input.where,
  //     orderBy: input.orderBy,
  //     by: input.by,
  //     having: input.having,
  //     take: input.take,
  //     skip: input.skip,
  //   });
  //   return groupByMountainFeature;
  // }),
  // updateMany: protectedProcedure.input(MountainFeatureUpdateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateManyMountainFeature = await ctx.prisma.mountainFeature.updateMany(input);
  //   return updateManyMountainFeature;
  // }),
  // updateOne: protectedProcedure.input(MountainFeatureUpdateArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateOneMountainFeature = await ctx.prisma.mountainFeature.update(input);
  //   return updateOneMountainFeature;
  // }),
  // upsertOne: protectedProcedure.input(MountainFeatureUpsertArgsSchema).mutation(async ({ctx, input}) => {
  //   const upsertOneMountainFeature = await ctx.prisma.mountainFeature.upsert(input);
  //   return upsertOneMountainFeature;
  // }),
});
