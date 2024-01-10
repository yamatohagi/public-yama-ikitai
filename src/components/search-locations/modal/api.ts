import {trpc} from 'src/utils/trpc';

type GetLocationsType = {
  word: string | undefined;
};
export default function GetLocations({word}: GetLocationsType) {
  const {data: locations, isLoading} = trpc.map.findLocations.useQuery({word: word || ''}, {enabled: !!word});

  return {locations, isLoading};
}
