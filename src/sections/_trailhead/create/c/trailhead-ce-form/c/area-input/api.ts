import {trpc} from 'src/utils/trpc';

export function GetMtAreaList() {
  const {data: mtAreaList, isLoading} = trpc.area.findMany.useQuery({
    select: {
      id: true,
      name: true,
    },
  });
  return {mtAreaList, isLoading};
}
