import {z} from 'zod';

export const findManyMtFacilityPhotoSchema = z.object({
  searchFilter: z
    .record(
      z.object({
        value: z.union([z.string(), z.array(z.string())]),
        label: z.union([z.string(), z.array(z.string())]),
      })
    )
    .optional(),
  orderBy: z.enum(['createdAtDesc', 'likeDesc']).optional(),
  mtFacilityId: z.number(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});
