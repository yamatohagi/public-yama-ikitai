import {protectedProcedure, publicProcedure, t} from 'server/trpc';

import RatingHistoryFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/RatingHistoryFindFirstArgsSchema';
import {RatingHistoryUpdateSchema} from './schemas/RatingHistoryUpdateSchema';

export const ratingHistoriesRouter = t.router({
  // aggregate: protectedProcedure.input(RatingHistoryAggregateArgsSchema).query(async ({ctx, input}) => {
  //   const aggregateRatingHistory = await ctx.prisma.ratingHistory.aggregate(input);
  //   return aggregateRatingHistory;
  // }),
  // createMany: protectedProcedure.input(RatingHistoryCreateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const createManyRatingHistory = await ctx.prisma.ratingHistory.createMany(input);
  //   return createManyRatingHistory;
  // }),
  update: protectedProcedure.input(RatingHistoryUpdateSchema).mutation(async ({ctx, input}) => {
    // まずそのままinsert
    await ctx.prisma.ratingHistory.create({
      data: {
        mtFacilityId: input.mtFacilityId,
        idName: input.idName,
        rating: input.rating,
        userId: input.userId,
      },
    });
    // 平均を出す
    const avgResult = await ctx.prisma.ratingHistory.aggregate({
      where: {mtFacilityId: input.mtFacilityId, idName: input.idName},
      _avg: {rating: true},
    });
    // 平均をmountainFacilityにupdate
    await ctx.prisma.mtFacility.update({
      where: {id: input.mtFacilityId},
      data: {[input.ratingColumnName]: avgResult._avg.rating || 0},
    });

    return true;
  }),
  // createOne: protectedProcedure.input(RatingHistoryCreateArgsSchema).mutation(async ({ctx, input}) => {
  //   const createOneRatingHistory = await ctx.prisma.ratingHistory.create(input);
  //   return createOneRatingHistory;
  // }),
  // deleteMany: protectedProcedure.input(RatingHistoryDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteManyRatingHistory = await ctx.prisma.ratingHistory.deleteMany(input);
  //   return deleteManyRatingHistory;
  // }),
  // deleteOne: protectedProcedure.input(RatingHistoryDeleteArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteOneRatingHistory = await ctx.prisma.ratingHistory.delete(input);
  //   return deleteOneRatingHistory;
  // }),
  // findFirst: protectedProcedure.input(RatingHistoryFindFirstArgsSchema).query(async ({ctx, input}) => {
  //   const findFirstRatingHistory = await ctx.prisma.ratingHistory.findFirst({
  //     where: input.where,
  //     select: {
  //       id: true,
  //     },
  //   });
  //   return findFirstRatingHistory;
  // }),

  isExist: publicProcedure.input(RatingHistoryFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstRatingHistory = await ctx.prisma.ratingHistory.findFirst({
      where: input.where,
      select: {
        id: true,
      },
    });
    return findFirstRatingHistory;
  }),

  // findMany: protectedProcedure.input(RatingHistoryFindManyArgsSchema).query(async ({ctx, input}) => {
  //   const findManyRatingHistory = await ctx.prisma.ratingHistory.findMany(input);
  //   return findManyRatingHistory;
  // }),
  // findUnique: protectedProcedure.input(RatingHistoryFindUniqueArgsSchema).query(async ({ctx, input}) => {
  //   const findUniqueRatingHistory = await ctx.prisma.ratingHistory.findUnique(input);
  //   return findUniqueRatingHistory;
  // }),

  // groupBy: protectedProcedure.input(RatingHistoryGroupByArgsSchema).query(async ({ctx, input}) => {
  //   const groupByRatingHistory = await ctx.prisma.ratingHistory.groupBy({
  //     where: input.where,
  //     orderBy: input.orderBy,
  //     by: input.by,
  //     having: input.having,
  //     take: input.take,
  //     skip: input.skip,
  //   });
  //   return groupByRatingHistory;
  // }),
  // updateMany: protectedProcedure.input(RatingHistoryUpdateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateManyRatingHistory = await ctx.prisma.ratingHistory.updateMany(input);
  //   return updateManyRatingHistory;
  // }),
  // updateOne: protectedProcedure.input(RatingHistoryUpdateArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateOneRatingHistory = await ctx.prisma.ratingHistory.update(input);
  //   return updateOneRatingHistory;
  // }),
  // upsertOne: protectedProcedure.input(RatingHistoryUpsertArgsSchema).mutation(async ({ctx, input}) => {
  //   const upsertOneRatingHistory = await ctx.prisma.ratingHistory.upsert(input);
  //   return upsertOneRatingHistory;
  // }),
});
