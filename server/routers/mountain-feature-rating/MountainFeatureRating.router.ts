import {protectedProcedure, publicProcedure, t} from 'server/trpc';

import {z} from 'zod';
import {mtFeatureRatingPostUseCase} from './useCase';
import {UpdateRatingSchema} from './schemas/MountainFeatureRatingSchema';

export const mtFeatureRatingRouter = t.router({
  post: protectedProcedure.input(UpdateRatingSchema).mutation(async ({ctx, input}) => {
    const result = await mtFeatureRatingPostUseCase({ctx, input});
    return result;
  }),
  // mountainFeatureRatingHistoryだねこｒ
  findAlready: publicProcedure
    .input(
      z.object({
        userId: z.string().cuid().optional(),
        featureName: z.string(),
      })
    )
    .query(async ({ctx, input}) => {
      if (!input.userId) {
        return false;
      }
      const result = await ctx.prisma.mountainFeatureRatingHistory.findFirst({
        where: {
          userId: input.userId,
          featureName: input.featureName,
        },
      });
      return result;
    }),
});
