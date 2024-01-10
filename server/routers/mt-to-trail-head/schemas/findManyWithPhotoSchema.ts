import {z} from 'zod';

export const findManyPhotoHashtagSchema = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
  // ハッシュタグを配列で受け取る
  hashtags: z.array(z.string()).optional(),
});

export const findManyTrailheadSchema = z.object({
  searchFilter: z
    .record(
      z.object({
        value: z.union([z.string(), z.array(z.string())]),
        label: z.union([z.string(), z.array(z.string())]),
      })
    )
    .optional(),
  orderBy: z.enum(['distanceAsc', 'mtPeakDesc', 'mtUphillTimeAsc', 'mtUphillTimeDesc']).optional(),
  hashtags: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
  areaId: z.number().nullish().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
      radius: z.number(),
    })
    .nullish()
    .optional(),
});
