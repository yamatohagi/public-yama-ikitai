import {trpc} from 'src/utils/trpc';
import {useMemo} from 'react';
import {useTrailheadFilterStore} from 'src/components/provider/trailheadFilterStore';
import {findManyTrailheadSchema} from 'server/routers/mt-to-trail-head/schemas/findManyWithPhotoSchema';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useAtom} from 'jotai';

const OrderAtom = atomWithStorage<(typeof findManyTrailheadSchema)['_type']['orderBy']>(
  'src/sections/_trailhead/search/api.ts',
  'distanceAsc',
  createJSONStorage(() => sessionStorage)
);

export function GetTrailheadList() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 12; // 例: 一度に10件のデータを取得
  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const {filteredValues} = useTrailheadFilterStore();

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.mtTrailHeads.findManyRaw.useInfiniteQuery(
    {
      searchFilter: filteredValues,
      orderBy,
      limit,
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );
  // コレを投稿に変えて末端に渡してpostのエラーを直す
  const posts = useMemo(() => rPostPages?.pages.flatMap((page) => ('posts' in page ? page.posts : page)), [rPostPages]);
  const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

  return {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState};
}
