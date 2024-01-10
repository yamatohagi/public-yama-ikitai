import {trpc} from 'src/utils/trpc';

export function GetList() {
  const {
    data: list,
    isLoading,
    refetch,
  } = trpc.mtFacilities.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });
  return {list, isLoading, refetch};
}
