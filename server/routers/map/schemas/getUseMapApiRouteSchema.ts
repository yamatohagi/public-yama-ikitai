import {z} from 'zod';

export const FindLocationsSchema = z.object({
  word: z.string(),
});
