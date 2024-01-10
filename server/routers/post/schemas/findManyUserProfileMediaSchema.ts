import {z} from 'zod';

export const findManyUserProfileMediaSchema = z.object({
  userId: z.string().cuid(),
  likeOnly: z.boolean().nullish(),
  replyOnly: z.boolean().nullish(),
  limit: z.number().min(1).max(100).nullish(),
  cursor: z.number().nullish(),
});
