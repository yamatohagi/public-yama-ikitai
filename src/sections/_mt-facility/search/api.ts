import {trpc} from 'src/utils/trpc';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {useMtFacilityFilterStore} from 'src/components/provider/mtFacilityFilterStore';
import {MtFacilityFindManyRawSchema} from 'server/routers/mt-facility/schemas/mtFacilityFindManyRawSchema';
import {useAtom} from 'jotai';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';

const OrderAtom = atomWithStorage<(typeof MtFacilityFindManyRawSchema)['_type']['orderBy']>(
  'src/sections/_mt-facility/search/api.ts',
  'distanceAsc',
  createJSONStorage(() => sessionStorage)
);

export function GetTrailheadList() {
  const [mtSearchSetting] = useMtSearchSetting(); // 緯度軽度のやつね
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 12; // 例: 一度に10件のデータを取得
  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const {filteredValues} = useMtFacilityFilterStore();

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.mtFacilities.findManyRaw.useInfiniteQuery(
    {
      searchFilter: filteredValues,
      orderBy,
      limit,
      from: mtSearchSetting.from,
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
