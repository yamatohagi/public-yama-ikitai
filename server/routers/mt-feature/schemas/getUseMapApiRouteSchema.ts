import {z} from 'zod';

export const MountainFeatureFindManyWithPhotoSchema = z.object({
  mountainId: z.number(),
  featureName: z.string().optional(),
});
