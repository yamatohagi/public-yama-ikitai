import {trpc} from 'src/utils/trpc';

type GetLocationsType = {
  placeId: string | undefined;
};
export default function GetLocationDetail({placeId}: GetLocationsType) {
  const {data: location, isLoading} = trpc.map.findLocationDetail.useQuery({placeId: placeId || ''}, {enabled: !!placeId});

  return {location, isLoading};
}
