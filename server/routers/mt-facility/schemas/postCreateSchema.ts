import MediaTypeSchema from 'generated/schema/zod/inputTypeSchemas/MediaTypeSchema';
import {z} from 'zod';

export const PostCreateSchema = z.object({
  data: z.object({
    content: z.string(),
    userId: z.string().cuid(),
    hashtagName: z.string().optional().nullable(),
    activityDate: z.date(),
    mtFacilityId: z.number(),
    images: z
      .array(
        z.object({
          title: z.string().max(25, 'タイトルは25文字以内で入力してください。'),
          thumbnail: z.string(),
          original: z.string(),
          type: MediaTypeSchema,
          width: z.number(),
          height: z.number(),
        })
      )
      .optional()
      .nullable(),
  }),
});
