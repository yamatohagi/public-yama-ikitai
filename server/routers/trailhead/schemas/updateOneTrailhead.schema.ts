import {z} from 'zod';

import TrailheadSelectSchema from 'generated/schema/zod/inputTypeSchemas/TrailheadSelectSchema';
import TrailheadIncludeSchema from 'generated/schema/zod/inputTypeSchemas/TrailheadIncludeSchema';
import {TrailheadCreateInputObjectSchema} from '../objects/TrailheadCreateInput.schema';

export const TrailheadEditSchema = z.object({
  select: TrailheadSelectSchema.optional(),
  include: TrailheadIncludeSchema.optional(),
  userId: z.string().cuid(),
  data: TrailheadCreateInputObjectSchema,
  id: z.number(),
});
