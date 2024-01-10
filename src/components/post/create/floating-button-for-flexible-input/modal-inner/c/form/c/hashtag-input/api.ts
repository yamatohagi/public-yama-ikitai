import {trpc} from 'src/utils/trpc';

export function GeHashtagList() {
  const {data: hashtagList, isLoading} = trpc.hashTag.findMany.useQuery({
    select: {
      id: true,
      tag: true,
    },
  });
  return {hashtagList, isLoading};
}
