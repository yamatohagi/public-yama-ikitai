import {trpc} from 'src/utils/trpc';

export function GetTrailheadList() {
  const {
    data,
    isLoading,
    // refetch: mtListRefetch,
  } = trpc.trailhead.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });

  return {list: data, isLoading};
}
