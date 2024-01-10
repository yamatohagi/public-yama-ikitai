import {z} from 'zod';

export const MtFacilityFindManyRawSchema = z.object({
  searchFilter: z
    .record(
      z.object({
        value: z.union([z.string(), z.array(z.string())]),
        label: z.union([z.string(), z.array(z.string())]),
      })
    )
    .optional(),
  orderBy: z.enum(['distanceAsc', 'mtPeakDesc', 'mtUphillTimeAsc', 'mtUphillTimeDesc']).optional(),
  limit: z.number().min(1).max(100),
  cursor: z.number().nullish(),
  areaId: z.number().optional(),
  from: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  coordinates: z
    .object({
      lat: z.number(),
      lng: z.number(),
      radius: z.number(),
    })
    .nullish()
    .optional(),
});
