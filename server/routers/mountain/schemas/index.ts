import {z} from 'zod';
import {MountainCreateInputObjectSchema, MtToThInfoSchema} from './objects/MountainCreateInput.schema';

export const UpsertApprovalSchema = z
  .object({
    include: MtToThInfoSchema.optional(),
    data: MountainCreateInputObjectSchema,
    userId: z.string().cuid(),
    id: z.number().int().positive().optional(),
    originId: z.number().int().positive(),
  })
  .strict();
