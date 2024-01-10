import MediaTypeSchema from 'generated/schema/zod/inputTypeSchemas/MediaTypeSchema';
import {z} from 'zod';

const Schema = z.object({
  name: z.string(),
  userProfileText: z.string(),
  userName: z.string(),
  images: z
    .array(
      z.object({
        title: z.string().max(25, 'タイトルは25文字以内で入力してください。'),
        thumbnail: z.string(),
        original: z.string(),
        dbPhotoId: z.number().optional().nullable(),
        type: MediaTypeSchema,
        width: z.number(),
        height: z.number(),
        labels: z
          .array(
            z.object({
              x: z.number(),
              y: z.number(),
              text: z.string(),
              url: z.string(),
              index: z.number(),
              mtId: z.number().optional().nullable(),
            })
          )
          .optional(),
      })
    )
    .optional()
    .nullable(),
});

export const UserEditInputSchema = Schema;
