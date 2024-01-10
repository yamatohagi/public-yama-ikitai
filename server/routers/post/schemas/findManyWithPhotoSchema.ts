import {z} from 'zod';

export const findManyPhotoHashtagSchema = z.object({
  take: z.number().optional(),
  skip: z.number().optional(),
  mountainId: z.number().optional(),
  // ハッシュタグを配列で受け取る
  hashtags: z.array(z.string()).optional(),
});

export const findManyWithPhotoSchema = z.object({
  photoExistsOnly: z.boolean().optional(),
  withPhotoFirstOnly: z.boolean().optional(),
  searchFilter: z
    .record(
      z.object({
        value: z.union([z.string(), z.array(z.string())]),
        label: z.union([z.string(), z.array(z.string())]),
      })
    )
    .optional(),
  // ハッシュタグを配列で受け取る
  hashtags: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
  orderBy: z.enum(['distanceAsc', 'mtPeakDesc', 'mtUphillTimeAsc', 'mtUphillTimeDesc', 'likeDesc', 'createdAtDesc']).optional(),
});
