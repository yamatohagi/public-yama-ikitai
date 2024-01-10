import {z} from 'zod';

export const findManyMtDetailPhotoSchema = z.object({
  searchFilter: z
    .record(
      z.object({
        value: z.union([z.string(), z.array(z.string())]),
        label: z.union([z.string(), z.array(z.string())]),
      })
    )
    .optional(),
  // ハッシュタグを配列で受け取る
  mtId: z.number(),
  viewTo: z.boolean(),
  orderBy: z.enum(['distanceAsc', 'mtPeakDesc', 'mtUphillTimeAsc', 'mtUphillTimeDesc', 'likeDesc', 'createdAtDesc']).optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});
