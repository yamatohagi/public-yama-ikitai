import {z} from 'zod';

export const FindUniqueByEditSchema = z.object({
  id: z.number(),
});
