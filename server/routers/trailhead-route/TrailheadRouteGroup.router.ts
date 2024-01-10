import TrailheadRouteGroupFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/TrailheadRouteGroupFindManyArgsSchema';
import {publicProcedure, t} from 'server/trpc';

export const trailheadRouteGroupsRouter = t.router({
  // aggregate: protectedProcedure.input(TrailheadRouteGroupAggregateArgsSchema).query(async ({ctx, input}) => {
  //   const aggregateTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.aggregate(input);
  //   return aggregateTrailheadRouteGroup;
  // }),
  // createMany: protectedProcedure.input(TrailheadRouteGroupCreateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const createManyTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.createMany(input);
  //   return createManyTrailheadRouteGroup;
  // }),
  // createOne: protectedProcedure.input(TrailheadRouteGroupCreateArgsSchema).mutation(async ({ctx, input}) => {
  //   const createOneTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.create(input);
  //   return createOneTrailheadRouteGroup;
  // }),
  // deleteMany: protectedProcedure.input(TrailheadRouteGroupDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteManyTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.deleteMany(input);
  //   return deleteManyTrailheadRouteGroup;
  // }),
  // deleteOne: protectedProcedure.input(TrailheadRouteGroupDeleteArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteOneTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.delete(input);
  //   return deleteOneTrailheadRouteGroup;
  // }),
  // findFirst: protectedProcedure.input(TrailheadRouteGroupFindFirstArgsSchema).query(async ({ctx, input}) => {
  //   const findFirstTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.findFirst(input);
  //   return findFirstTrailheadRouteGroup;
  // }),
  findManyWithRoute: publicProcedure.input(TrailheadRouteGroupFindManyArgsSchema).query(async ({ctx, input}) => {
    const findFirstTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.findMany({
      where: input.where,
      include: {
        routes: true,
      },
    });

    return findFirstTrailheadRouteGroup;
  }),

  // findMany: protectedProcedure.input(TrailheadRouteGroupFindManyArgsSchema).query(async ({ctx, input}) => {
  //   const findManyTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.findMany(input);
  //   return findManyTrailheadRouteGroup;
  // }),
  // findUnique: protectedProcedure.input(TrailheadRouteGroupFindUniqueArgsSchema).query(async ({ctx, input}) => {
  //   const findUniqueTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.findUnique(input);
  //   return findUniqueTrailheadRouteGroup;
  // }),

  // groupBy: protectedProcedure.input(TrailheadRouteGroupGroupByArgsSchema).query(async ({ctx, input}) => {
  //   const groupByTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.groupBy({
  //     where: input.where,
  //     orderBy: input.orderBy,
  //     by: input.by,
  //     having: input.having,
  //     take: input.take,
  //     skip: input.skip,
  //   });
  //   return groupByTrailheadRouteGroup;
  // }),
  // updateMany: protectedProcedure.input(TrailheadRouteGroupUpdateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateManyTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.updateMany(input);
  //   return updateManyTrailheadRouteGroup;
  // }),
  // updateOne: protectedProcedure.input(TrailheadRouteGroupUpdateArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateOneTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.update(input);
  //   return updateOneTrailheadRouteGroup;
  // }),
  // upsertOne: protectedProcedure.input(TrailheadRouteGroupUpsertArgsSchema).mutation(async ({ctx, input}) => {
  //   const upsertOneTrailheadRouteGroup = await ctx.prisma.trailheadRouteGroup.upsert(input);
  //   return upsertOneTrailheadRouteGroup;
  // }),
});
