import {publicProcedure, t} from 'server/trpc';
import {GetSearchPlaceSchema} from './schemas/getUseMapApiRouteSchema';
import {getSearchPlaceUseCase} from './useCase';

export const searchPlaceRouter = t.router({
  getSearchPlace: publicProcedure.input(GetSearchPlaceSchema).query(async ({ctx, input}) => {
    const result = await getSearchPlaceUseCase({ctx, input});

    return result;
  }),
});
