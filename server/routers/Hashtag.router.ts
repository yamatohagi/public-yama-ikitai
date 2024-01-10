import HashtagCreateArgsSchema from 'generated/schema/zod/outputTypeSchemas/HashtagCreateArgsSchema';
import HashtagDeleteManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/HashtagDeleteManyArgsSchema';
import HashtagFindFirstArgsSchema from 'generated/schema/zod/outputTypeSchemas/HashtagFindFirstArgsSchema';
import HashtagFindManyArgsSchema from 'generated/schema/zod/outputTypeSchemas/HashtagFindManyArgsSchema';
import {protectedProcedure, publicProcedure, t} from 'server/trpc';

export const hashtagsRouter = t.router({
  createOne: protectedProcedure.input(HashtagCreateArgsSchema).mutation(async ({ctx, input}) => {
    const createOneHashtag = await ctx.prisma.hashtag.create(input);
    return createOneHashtag;
  }),
  deleteMany: protectedProcedure.input(HashtagDeleteManyArgsSchema).mutation(async ({ctx, input}) => {
    const deleteManyHashtag = await ctx.prisma.hashtag.deleteMany(input);
    return deleteManyHashtag;
  }),
  findFirst: publicProcedure.input(HashtagFindFirstArgsSchema).query(async ({ctx, input}) => {
    const findFirstHashtag = await ctx.prisma.hashtag.findFirst(input);
    return findFirstHashtag;
  }),
  findMany: publicProcedure.input(HashtagFindManyArgsSchema).query(async ({ctx, input}) => {
    const findManyHashtag = await ctx.prisma.hashtag.findMany(input);
    return findManyHashtag;
  }),
});
