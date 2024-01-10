import {trpc} from 'src/utils/trpc';

export function GetTrailheadList() {
  const {
    data: trailheadList,
    isLoading,
    refetch,
  } = trpc.trailhead.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });
  return {trailheadList, isLoading, refetch};
}
