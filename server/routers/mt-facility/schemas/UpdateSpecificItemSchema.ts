import MtFacilityScalarFieldEnumSchema from 'generated/schema/zod/inputTypeSchemas/MtFacilityScalarFieldEnumSchema';
import {z} from 'zod';

const flagRemarkSchema = z.object({
  columnName: MtFacilityScalarFieldEnumSchema,
  value: z.union([z.number(), z.string()]), // ここは実際の型に合わせてください
});

export const UpdateSpecificItemSchema = z.object({
  mtFacilityId: z.number(),
  userId: z.string().cuid().optional(),
  flag: flagRemarkSchema,
  remark: flagRemarkSchema,
});
