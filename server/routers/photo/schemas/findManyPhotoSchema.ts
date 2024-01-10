import {z} from 'zod';

export const findManyPhotoSchema = z.object({
  hashtags: z.array(z.string()).optional(),
  facilityId: z.number().nullable().optional(),
  mtId: z.number().nullable().optional(),
  trailheadId: z.number().nullable().optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});
