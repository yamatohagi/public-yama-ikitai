import {trpc} from 'src/utils/trpc';

export function GetMtList() {
  const {data, isLoading} = trpc.mountains.findManyOld.useQuery({
    select: {
      id: true,
      name: true,
    },
  });

  return {list: data, isLoading};
}
