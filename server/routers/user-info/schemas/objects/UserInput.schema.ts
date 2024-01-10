import {z} from 'zod';

const Schema = z.object({
  startPointLng: z.string().nullable(),
  startPointLat: z.string().nullable(),
  startPointLabel: z.string().nullable(),
  dayMoveMaxTime: z.string().nullable(),
  stayStartTime: z.string().nullable(),
  startDayOfWeek: z.string().nullable(),
  coordinatesRadius: z.string().nullable(),
});

export const UserInfoInputSchema = Schema;
