import PostBookmarkCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostBookmarkCreateArgsSchema';
import PostBookmarkDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostBookmarkDeleteManyArgsSchema';
import PostBookmarkFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostBookmarkFindFirstArgsSchema';
import PostBookmarkFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostBookmarkFindManyArgsSchema';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';

export const postbookmarksRouter = t.router({
  createOne: protectedProcedure.input(PostBookmarkCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOnePostBookmark = await ctx.prisma.postBookmark.create(input);
    return createOnePostBookmark;
  }),
  deleteMany: protectedProcedure.input(PostBookmarkDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyPostBookmark = await ctx.prisma.postBookmark.deleteMany(input);
    return deleteManyPostBookmark;
  }),
  findFirst: publicProcedure.input(PostBookmarkFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstPostBookmark = await ctx.prisma.postBookmark.findFirst(input);
    return findFirstPostBookmark;
  }),
  findMany: publicProcedure.input(PostBookmarkFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyPostBookmark = await ctx.prisma.postBookmark.findMany(input);
    return findManyPostBookmark;
  }),
});
