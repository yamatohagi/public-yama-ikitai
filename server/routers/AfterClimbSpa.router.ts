import AfterClimbSpaCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbSpaCreateArgsSchema';
import AfterClimbSpaDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbSpaDeleteManyArgsSchema';
import AfterClimbSpaFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbSpaFindFirstArgsSchema';
import AfterClimbSpaFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbSpaFindManyArgsSchema';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';

export const afterclimbspasRouter = t.router({
  createOne: protectedProcedure.input(AfterClimbSpaCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOneAfterClimbSpa = await ctx.prisma.afterClimbSpa.create(input);
    return createOneAfterClimbSpa;
  }),
  deleteMany: protectedProcedure.input(AfterClimbSpaDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyAfterClimbSpa = await ctx.prisma.afterClimbSpa.deleteMany(input);
    return deleteManyAfterClimbSpa;
  }),
  findFirst: publicProcedure.input(AfterClimbSpaFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstAfterClimbSpa = await ctx.prisma.afterClimbSpa.findFirst(input);
    return findFirstAfterClimbSpa;
  }),
  findMany: publicProcedure.input(AfterClimbSpaFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyAfterClimbSpa = await ctx.prisma.afterClimbSpa.findMany(input);
    return findManyAfterClimbSpa;
  }),
});
