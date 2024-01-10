import { z } from 'zod';

export const GetSearchPlaceSchema = z.object({
  searchInput: z.string(),
});
