import {z} from 'zod';

import {MtFacilityCreateInputSchema} from './objects/MtFacilityCreateInput.schema';

export const MtFacilityEditSchema = z
  .object({
    data: MtFacilityCreateInputSchema,
    userId: z.string().cuid(),
    id: z.number().int().positive(),
  })
  .strict();
