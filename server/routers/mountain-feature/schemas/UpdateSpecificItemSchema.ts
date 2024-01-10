import MountainFeatureScalarFieldEnumSchema from 'generated/schema/zod/inputTypeSchemas/MountainFeatureScalarFieldEnumSchema';
import {z} from 'zod';

const RemarkSchema = z.object({
  columnName: MountainFeatureScalarFieldEnumSchema,
  value: z.union([z.number(), z.string()]), // ここは実際の型に合わせてください
});

export const UpdateFeatureItemSchema = z.object({
  mtId: z.number(),
  userId: z.string().cuid().optional(),
  remark: RemarkSchema,
});
