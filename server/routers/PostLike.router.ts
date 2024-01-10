import PostLikeCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostLikeCreateArgsSchema';
import PostLikeDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostLikeDeleteManyArgsSchema';
import PostLikeFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostLikeFindFirstArgsSchema';
import PostLikeFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/PostLikeFindManyArgsSchema';
import {protectedProcedure, t, publicProcedure} from 'server/trpc';

export const postlikesRouter = t.router({
  createOne: protectedProcedure.input(PostLikeCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOnePostLike = await ctx.prisma.postLike.create(input);
    return createOnePostLike;
  }),
  deleteMany: protectedProcedure.input(PostLikeDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyPostLike = await ctx.prisma.postLike.deleteMany(input);
    return deleteManyPostLike;
  }),
  findFirst: publicProcedure.input(PostLikeFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstPostLike = await ctx.prisma.postLike.findFirst(input);
    return findFirstPostLike;
  }),
  findMany: publicProcedure.input(PostLikeFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyPostLike = await ctx.prisma.postLike.findMany(input);
    return findManyPostLike;
  }),
});
