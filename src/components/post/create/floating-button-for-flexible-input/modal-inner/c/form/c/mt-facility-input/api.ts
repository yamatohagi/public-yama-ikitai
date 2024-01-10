import {trpc} from 'src/utils/trpc';

export function GetMtFacilityList() {
  const {data: mtList, isLoading} = trpc.mtFacilities.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });
  return {mtList, isLoading};
}
