import {protectedProcedure, t} from 'server/trpc';
import {findManyForMtFacilityCreateChoiceSchema} from './schemas/findManyForMtFacilityCreateChoiceSchema';

export const rsvMethodRouter = t.router({
  findManyForMtFacilityCreateChoice: protectedProcedure.input(findManyForMtFacilityCreateChoiceSchema).query(async ({ctx, input}) => {
    // 検索キーワードが存在するかどうかで条件を分岐
    const whereCondition = input.word
      ? {
          name: {
            contains: input.word,
          },
        }
      : {};

    const rsvMethodTypes = await ctx.prisma.rsvMethod.findMany({
      select: {
        id: true,
        name: true,
      },
      where: whereCondition,
      orderBy: {name: 'asc'},
      take: input.limit || 200,
    });
    return rsvMethodTypes;
  }),
});
