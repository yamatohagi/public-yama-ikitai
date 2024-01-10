import {z} from 'zod';
import {MountainSelectSchema} from 'generated/schema/zod/outputTypeSchemas/MountainFindManyArgsSchema';
import MountainIncludeSchema from 'generated/schema/zod/inputTypeSchemas/MountainIncludeSchema';
import {MountainCreateInputObjectSchema} from './objects/MountainCreateInput.schema';

export const UpsertRequestSchema = z.object({
  select: MountainSelectSchema.optional(),
  include: MountainIncludeSchema.optional(),
  data: MountainCreateInputObjectSchema,
  userId: z.string().cuid(),
  originalId: z.number().int().optional(),
});
