import MountainIncludeSchema from 'generated/schema/zod/inputTypeSchemas/MountainIncludeSchema';
import MountainScalarFieldEnumSchema from 'generated/schema/zod/inputTypeSchemas/MountainScalarFieldEnumSchema';
import MountainWhereInputSchema from 'generated/schema/zod/inputTypeSchemas/MountainWhereInputSchema';
import {MountainSelectSchema} from 'generated/schema/zod/outputTypeSchemas/MountainFindManyArgsSchema';
import {z} from 'zod';

export const NMountainFindManySchema = z.object({
  searchFilter: z
    .record(
      z.object({
        value: z.union([z.string(), z.array(z.string())]),
        label: z.union([z.string(), z.array(z.string())]),
      })
    )
    .optional(),
  dayMoveMaxTime: z.number(),
  startDayOfWeek: z.number(),
  stayStartTime: z.string(),
  from: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  select: z.lazy(() => MountainSelectSchema.optional()),
  include: z.lazy(() => MountainIncludeSchema.optional()),
  orderBy: z.enum(['distanceAsc', 'mtPeakDesc', 'mtUphillTimeAsc', 'mtUphillTimeDesc']).optional(),
  where: MountainWhereInputSchema.optional(),
  cursor: z.number().nullish(),
  distinct: z.array(MountainScalarFieldEnumSchema).optional(),
  // エリアでの絞り込み
  areaId: z.number().nullish().optional(),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
      radius: z.number(),
    })
    .nullish()
    .optional(),
  limit: z.number().min(1).max(100).nullish(),
});
