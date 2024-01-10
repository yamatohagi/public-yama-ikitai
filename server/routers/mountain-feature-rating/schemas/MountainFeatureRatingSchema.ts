import {z} from 'zod';

export const UpdateRatingSchema = z.object({
  userId: z.string().cuid(),
  mountainFeatureId: z.number(),
  featureName: z.string(),
  rating: z.number(),
});
