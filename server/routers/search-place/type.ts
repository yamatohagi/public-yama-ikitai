import { Context } from 'prisma/context';
import { GetSearchPlaceSchema } from './schemas/getUseMapApiRouteSchema';

export type GetSearchPlaceProps = {
  input: (typeof GetSearchPlaceSchema)['_type'];
  ctx: Context;
};

export type TravelTimeResult = { travelTime: { value: number | null; status: string } };
