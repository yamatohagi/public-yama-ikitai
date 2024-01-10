import {z} from 'zod';

export const UpdateRatingSchema = z.object({
  featureType: z.string(),
  userId: z.string().cuid(),
  rating: z.number(),
  trailheadId: z.number(),
});
