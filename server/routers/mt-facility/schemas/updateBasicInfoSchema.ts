import {z} from 'zod';

export const UpdateBasicInfoSchema = z.object({
  mtFacilityId: z.number(),
  userId: z.string().cuid().optional(),
  listTelOffice: z.string().max(20).optional(),
});
