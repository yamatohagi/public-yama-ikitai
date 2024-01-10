import {z} from 'zod';
import {MtUrlMemoSchema} from './objects/MountainCreateInput.schema';

export const MtUrlMemoEditSchema = z.object({
  data: MtUrlMemoSchema,
  userId: z.string().cuid(),
  mtId: z.number().int().positive(),
});
