import {trpc} from 'src/utils/trpc';
import {useMemo} from 'react';
import {useAtom} from 'jotai';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';
import {useMtFilterStore} from 'src/components/provider/mtFilterStore';
import {NMountainFindManySchema} from 'server/schemas/findManyMountain.schema';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useRouter} from 'next/router';

const OrderAtom = atomWithStorage<(typeof NMountainFindManySchema)['_type']['orderBy']>(
  'src/sections/_mountain/search/c/mt-list/index.tsx',
  'distanceAsc',
  createJSONStorage(() => sessionStorage)
);

export function GetMtList() {
  const itemsPerPage = 8;
  const router = useRouter();
  const {filteredValues} = useMtFilterStore();
  const [mtSearchSetting] = useMtSearchSetting();

  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const query: (typeof NMountainFindManySchema)['_type'] = {
    searchFilter: filteredValues,
    dayMoveMaxTime: mtSearchSetting.dayMoveMaxTime,
    stayStartTime: mtSearchSetting.stayStartTime,
    startDayOfWeek: mtSearchSetting.startDayOfWeek,
    from: mtSearchSetting.from,
    orderBy,
  };
  // type SomeType = Prisma.MountainGetPayload<typeof query & typeof findManyMountainArgs>;
  const {data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = trpc.mountains.findMany.useInfiniteQuery(query, {
    staleTime: 6000,
    networkMode: 'always',
    enabled: router.isReady, // page=2なのにpageがとれてないときはfalse
    getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
  });

  const mountains = useMemo(() => data?.pages.flatMap((page) => ('result' in page ? page.result : page)), [data]);
  const [count] = useMemo(() => data?.pages.flatMap((page) => ('result' in page ? page.count : page)), [data]) || [0];

  return {mountains, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, itemsPerPage};
}
