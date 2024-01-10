import MediaTypeSchema from 'generated/schema/zod/inputTypeSchemas/MediaTypeSchema';
import {z} from 'zod';

export const EditWithHashtagSchema = z.object({
  data: z.object({
    postId: z.number(),
    content: z.string(),
    userId: z.string().cuid(),
    hashtagName: z.string().optional().nullable(),
    activityDate: z.date(),
    mtFacilityId: z.number().nullable().optional(),
    mtId: z.number().nullable().optional(),
    trailheadId: z.number().nullable().optional(),
    hashtagIds: z.array(z.number()).nullable().optional(),
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

                index: z.number(),
                mtId: z.number().optional().nullable(),
              })
            )
            .optional(),
        })
      )
      .optional()
      .nullable(),
  }),
});
