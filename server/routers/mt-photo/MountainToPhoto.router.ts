import MountainToPhotoFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainToPhotoFindManyArgsSchema';
import {publicProcedure, t} from 'server/trpc';

export const mtPhotosRouter = t.router({
  // aggregate: protectedProcedure.input(MountainPhotoAggregateArgsSchema).query(async ({ctx, input}) => {
  //   const aggregateMountainPhoto = await ctx.prisma.mountainToPhoto.aggregate(input);
  //   return aggregateMountainPhoto;
  // }),
  // createMany: protectedProcedure.input(MountainPhotoCreateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const createManyMountainPhoto = await ctx.prisma.mountainToPhoto.createMany(input);
  //   return createManyMountainPhoto;
  // }),
  // createOne: protectedProcedure.input(MountainPhotoCreateArgsSchema).mutation(async ({ctx, input}) => {
  //   const createOneMountainPhoto = await ctx.prisma.mountainToPhoto.create(input);
  //   return createOneMountainPhoto;
  // }),
  // deleteMany: protectedProcedure.input(MountainPhotoDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteManyMountainPhoto = await ctx.prisma.mountainToPhoto.deleteMany(input);
  //   return deleteManyMountainPhoto;
  // }),
  // deleteOne: protectedProcedure.input(MountainPhotoDeleteArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteOneMountainPhoto = await ctx.prisma.mountainToPhoto.delete(input);
  //   return deleteOneMountainPhoto;
  // }),
  // findFirst: protectedProcedure.input(MountainPhotoFindFirstArgsSchema).query(async ({ctx, input}) => {
  //   const findFirstMountainPhoto = await ctx.prisma.mountainToPhoto.findFirst(input);
  //   return findFirstMountainPhoto;
  // }),
  findMany: publicProcedure.input(MountainToPhotoFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyMountainPhoto = await ctx.prisma.mountainToPhoto.findMany(input);
    return findManyMountainPhoto;
  }),
  // findUnique: protectedProcedure.input(MountainPhotoFindUniqueArgsSchema).query(async ({ctx, input}) => {
  //   const findUniqueMountainPhoto = await ctx.prisma.mountainToPhoto.findUnique(input);
  //   return findUniqueMountainPhoto;
  // }),

  // groupBy: protectedProcedure.input(MountainPhotoGroupByArgsSchema).query(async ({ctx, input}) => {
  //   const groupByMountainPhoto = await ctx.prisma.mountainToPhoto.groupBy({
  //     where: input.where,
  //     orderBy: input.orderBy,
  //     by: input.by,
  //     having: input.having,
  //     take: input.take,
  //     skip: input.skip,
  //   });
  //   return groupByMountainPhoto;
  // }),
  // updateMany: protectedProcedure.input(MountainPhotoUpdateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateManyMountainPhoto = await ctx.prisma.mountainToPhoto.updateMany(input);
  //   return updateManyMountainPhoto;
  // }),
  // updateOne: protectedProcedure.input(MountainPhotoUpdateArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateOneMountainPhoto = await ctx.prisma.mountainToPhoto.update(input);
  //   return updateOneMountainPhoto;
  // }),
  // upsertOne: protectedProcedure.input(MountainPhotoUpsertArgsSchema).mutation(async ({ctx, input}) => {
  //   const upsertOneMountainPhoto = await ctx.prisma.mountainToPhoto.upsert(input);
  //   return upsertOneMountainPhoto;
  // }),
});
