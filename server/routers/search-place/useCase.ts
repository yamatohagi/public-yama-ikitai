import { suggestStations } from './functions/station';
import { GetSearchPlaceProps } from './type';

export const getSearchPlaceUseCase = async ({ input, ctx }: GetSearchPlaceProps) => {
  const result = suggestStations(input.searchInput);
  return result;
};
