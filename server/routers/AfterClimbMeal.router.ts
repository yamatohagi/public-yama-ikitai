import AfterClimbMealCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbMealCreateArgsSchema';
import AfterClimbMealDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbMealDeleteManyArgsSchema';
import AfterClimbMealFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbMealFindFirstArgsSchema';
import AfterClimbMealFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/AfterClimbMealFindManyArgsSchema';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';

export const afterclimbmealsRouter = t.router({
  createOne: protectedProcedure.input(AfterClimbMealCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOneAfterClimbMeal = await ctx.prisma.afterClimbMeal.create(input);
    return createOneAfterClimbMeal;
  }),
  deleteMany: protectedProcedure.input(AfterClimbMealDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyAfterClimbMeal = await ctx.prisma.afterClimbMeal.deleteMany(input);
    return deleteManyAfterClimbMeal;
  }),
  findFirst: publicProcedure.input(AfterClimbMealFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstAfterClimbMeal = await ctx.prisma.afterClimbMeal.findFirst(input);
    return findFirstAfterClimbMeal;
  }),
  findMany: publicProcedure.input(AfterClimbMealFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyAfterClimbMeal = await ctx.prisma.afterClimbMeal.findMany(input);
    return findManyAfterClimbMeal;
  }),
});
