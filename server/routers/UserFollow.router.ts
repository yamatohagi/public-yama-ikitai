import UserFollowCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFollowCreateArgsSchema';
import UserFollowDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFollowDeleteManyArgsSchema';
import UserFollowFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFollowFindFirstArgsSchema';
import UserFollowFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/UserFollowFindManyArgsSchema';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';

export const userfollowsRouter = t.router({
  createOne: protectedProcedure.input(UserFollowCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOneUserFollow = await ctx.prisma.userFollow.create(input);
    return createOneUserFollow;
  }),
  deleteMany: protectedProcedure.input(UserFollowDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyUserFollow = await ctx.prisma.userFollow.deleteMany(input);
    return deleteManyUserFollow;
  }),
  findFirst: publicProcedure.input(UserFollowFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstUserFollow = await ctx.prisma.userFollow.findFirst(input);
    return findFirstUserFollow;
  }),
  findMany: publicProcedure.input(UserFollowFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyUserFollow = await ctx.prisma.userFollow.findMany(input);
    return findManyUserFollow;
  }),
});
