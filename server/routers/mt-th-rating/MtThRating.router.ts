import {protectedProcedure, publicProcedure, t} from 'server/trpc';

import {z} from 'zod';
import {mtThRatingPostUseCase} from './useCase';
import {UpdateRatingSchema} from './schemas/MtThRatingSchema';

export const mtThRatingRouter = t.router({
  post: protectedProcedure.input(UpdateRatingSchema).mutation(async ({ctx, input}) => {
    const result = await mtThRatingPostUseCase({ctx, input});
    return result;
  }),
  findManyByUser: publicProcedure
    .input(
      z.object({
        trailheadId: z.number(),
        userId: z.string().cuid().optional(),
      })
    )
    .query(async ({ctx, input}) => {
      if (!input.userId) return [];
      const result = ctx.prisma.trailheadRatingHistory.findMany({
        where: {
          trailheadId: input.trailheadId,
          userId: input.userId,
        },
        select: {
          featureType: true,
        },
      });
      return result;
    }),
  findMany: publicProcedure
    .input(
      z.object({
        trailheadId: z.number(),
      })
    )
    .query(async ({ctx, input}) => {
      const result = ctx.prisma.trailheadRating.findMany({
        where: {
          trailheadId: input.trailheadId,
        },
        select: {
          featureType: true,
          rating: true,
        },
      });
      return result;
    }),
});
