import {z} from 'zod';
import {MtFacilityCreateInputSchema} from './objects/MtFacilityCreateInput.schema';

export const MtFacilityCreateSchema = z
  .object({
    data: MtFacilityCreateInputSchema,
    userId: z.string().cuid(),
  })
  .strict();
