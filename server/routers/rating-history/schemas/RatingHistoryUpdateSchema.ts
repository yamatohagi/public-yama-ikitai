import MtFacilityScalarFieldEnumSchema from 'generated/schema/zod/inputTypeSchemas/MtFacilityScalarFieldEnumSchema';
import {z} from 'zod';

export const RatingHistoryUpdateSchema = z.object({
  mtFacilityId: z.number(),
  idName: z.string(),
  rating: z.number(),
  // 特定のカラムenumにしたいkeyof MtFacility;
  ratingColumnName: MtFacilityScalarFieldEnumSchema,
  userId: z.string().cuid().optional(),
});
