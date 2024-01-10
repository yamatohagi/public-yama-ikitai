import {z} from 'zod';

export const findManyTrailheadPhotoSchema = z.object({
  orderBy: z.enum(['createdAtDesc', 'likeDesc']).optional(),
  trailheadId: z.number(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});
