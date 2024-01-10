import {trpc} from 'src/utils/trpc';

export function GetMtList() {
  const {data: mtList, isLoading} = trpc.mountains.findManyOld.useQuery({
    select: {
      id: true,
      name: true,
    },
  });
  return {mtList, isLoading};
}
