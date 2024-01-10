import {trpc} from 'src/utils/trpc';

export function GetTrailheadList() {
  const {data: mtList, isLoading} = trpc.trailhead.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });
  return {mtList, isLoading};
}
