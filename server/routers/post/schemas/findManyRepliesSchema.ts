import {z} from 'zod';

export const findManyRepliesSchema = z.object({
  postId: z.number(),
});
