import AreaCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/AreaCreateArgsSchema';
import AreaDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/AreaDeleteManyArgsSchema';
import AreaFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/AreaFindFirstArgsSchema';
import AreaFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/AreaFindManyArgsSchema';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';

export const areasRouter = t.router({
  createOne: protectedProcedure.input(AreaCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOneArea = await ctx.prisma.area.create(input);
    return createOneArea;
  }),
  deleteMany: protectedProcedure.input(AreaDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyArea = await ctx.prisma.area.deleteMany(input);
    return deleteManyArea;
  }),
  findFirst: publicProcedure.input(AreaFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstArea = await ctx.prisma.area.findFirst(input);
    return findFirstArea;
  }),
  findMany: publicProcedure.input(AreaFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyArea = await ctx.prisma.area.findMany(input);
    return findManyArea;
  }),
});
