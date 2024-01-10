import {z} from 'zod';

export const FindLocationDetailSchema = z.object({
  placeId: z.string(),
});
