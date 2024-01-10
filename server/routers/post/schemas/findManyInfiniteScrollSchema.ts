import {z} from 'zod';

export const findManyInfiniteScrollSchema = z.object({
  mtFacilityId: z.number().nullable().optional(),
  trailheadId: z.number().nullable().optional(),
  mtId: z.number().nullable().optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
  orderBy: z.enum(['likeDesc', 'createdAtDesc']).optional(),
});
