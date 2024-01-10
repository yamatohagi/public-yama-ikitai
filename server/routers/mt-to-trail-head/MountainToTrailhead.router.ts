import {publicProcedure, t} from 'server/trpc';

import MountainToTrailheadFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/MountainToTrailheadFindManyArgsSchema';
import {findManyTrailheadSchema} from './schemas/findManyWithPhotoSchema';
import {generateSQLOrderClause, generateSQLWhereClause} from './repository';
import {TrailheadGetQueryRawType, TrailheadsGetSql} from './type';
import {transformTrailheads} from './functions/organize';

export const mountainTrailHeadsRouter = t.router({
  // aggregate: protectedProcedure.input(MountainTrailheadAggregateArgsSchema).query(async ({ctx, input}) => {
  //   const aggregateMountainTrailhead = await ctx.prisma.mountainToTrailhead.aggregate(input);
  //   return aggregateMountainTrailhead;
  // }),
  // createMany: protectedProcedure.input(MountainTrailheadCreateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const createManyMountainTrailhead = await ctx.prisma.mountainToTrailhead.createMany(input);
  //   return createManyMountainTrailhead;
  // }),
  // createOne: protectedProcedure.input(MountainTrailheadCreateArgsSchema).mutation(async ({ctx, input}) => {
  //   const createOneMountainTrailhead = await ctx.prisma.mountainToTrailhead.create(input);
  //   return createOneMountainTrailhead;
  // }),
  // deleteMany: protectedProcedure.input(MountainTrailheadDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteManyMountainTrailhead = await ctx.prisma.mountainToTrailhead.deleteMany(input);
  //   return deleteManyMountainTrailhead;
  // }),
  // deleteOne: protectedProcedure.input(MountainTrailheadDeleteArgsSchema).mutation(async ({ctx, input}) => {
  //   const deleteOneMountainTrailhead = await ctx.prisma.mountainToTrailhead.delete(input);
  //   return deleteOneMountainTrailhead;
  // }),
  // findFirst: protectedProcedure.input(MountainTrailheadFindFirstArgsSchema).query(async ({ctx, input}) => {
  //   const findFirstMountainTrailhead = await ctx.prisma.mountainToTrailhead.findFirst(input);
  //   return findFirstMountainTrailhead;
  // }),

  findMany: publicProcedure.input(MountainToTrailheadFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyMountainTrailhead = await ctx.prisma.mountainToTrailhead.findMany(input);
    return findManyMountainTrailhead;
  }),

  findManyRaw: publicProcedure.input(findManyTrailheadSchema).query(async ({ctx, input}) => {
    let hashtags: {id: number}[] = [];

    const limit = input.limit || 3;
    const cursor = input.cursor || 0;
    const nextCursor = cursor + limit;
    // 入力されたハッシュタグからハッシュタグのIDを取得
    if (input.hashtags) {
      hashtags = await ctx.prisma.hashtag.findMany({
        where: {
          tag: {in: input.hashtags},
        },
        select: {id: true},
      });

      if (hashtags.length !== input.hashtags?.length) {
        return [];
      }
    }

    const [whereClause, bindValues] = generateSQLWhereClause(input, hashtags.length + 3);
    const orderClause = generateSQLOrderClause(input);

    const hashtagIds = hashtags.map((hashtag) => hashtag.id);

    const stringQuery = ctx.prisma.$queryRawUnsafe<TrailheadGetQueryRawType[]>(
      TrailheadsGetSql(whereClause, hashtagIds, orderClause),
      ...hashtagIds,
      limit,
      cursor,
      ...bindValues
    );
    const countQuery = ctx.prisma.$queryRawUnsafe<{count: string}[]>(
      TrailheadsGetSql(whereClause, hashtagIds, orderClause, true),
      ...hashtagIds,
      limit,
      cursor,
      ...bindValues
    );

    const [posts, countResult] = await Promise.all([stringQuery, countQuery]);

    const count = Number(countResult[0].count);

    return {
      posts: transformTrailheads(posts),
      count,
      nextCursor: nextCursor < count ? nextCursor : null,
    };
  }),
  // findUnique: protectedProcedure.input(MountainTrailheadFindUniqueArgsSchema).query(async ({ctx, input}) => {
  //   const findUniqueMountainTrailhead = await ctx.prisma.mountainToTrailhead.findUnique(input);
  //   return findUniqueMountainTrailhead;
  // }),

  // groupBy: protectedProcedure.input(MountainTrailheadGroupByArgsSchema).query(async ({ctx, input}) => {
  //   const groupByMountainTrailhead = await ctx.prisma.mountainToTrailhead.groupBy({
  //     where: input.where,
  //     orderBy: input.orderBy,
  //     by: input.by,
  //     having: input.having,
  //     take: input.take,
  //     skip: input.skip,
  //   });
  //   return groupByMountainTrailhead;
  // }),
  // updateMany: protectedProcedure.input(MountainTrailheadUpdateManyArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateManyMountainTrailhead = await ctx.prisma.mountainToTrailhead.updateMany(input);
  //   return updateManyMountainTrailhead;
  // }),
  // updateOne: protectedProcedure.input(MountainTrailheadUpdateArgsSchema).mutation(async ({ctx, input}) => {
  //   const updateOneMountainTrailhead = await ctx.prisma.mountainToTrailhead.update(input);
  //   return updateOneMountainTrailhead;
  // }),
  // upsertOne: protectedProcedure.input(MountainTrailheadUpsertArgsSchema).mutation(async ({ctx, input}) => {
  //   const upsertOneMountainTrailhead = await ctx.prisma.mountainToTrailhead.upsert(input);
  //   return upsertOneMountainTrailhead;
  // }),
});
