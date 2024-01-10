import {z} from 'zod';

export const findManyForMtFacilityCreateChoiceSchema = z.object({
  word: z.string().optional().nullable(),
  limit: z.number().min(1).max(100).nullish(),
});
