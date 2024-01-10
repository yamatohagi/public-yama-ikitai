import NoticeFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/NoticeFindManyArgsSchema';
import {publicProcedure, t} from 'server/trpc';

export const noticeRouter = t.router({
  findMany: publicProcedure.input(NoticeFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyArea = await ctx.prisma.notice.findMany(input);
    return findManyArea;
  }),
});
