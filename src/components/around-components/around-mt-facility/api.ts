import {trpc} from 'src/utils/trpc';
import {useMemo} from 'react';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';

type GetMtFacilityListProps = {
  lng?: number | null;
  lat?: number | null;
};

export function GetMtFacilityList({lng, lat}: GetMtFacilityListProps) {
  const [mtSearchSetting] = useMtSearchSetting();
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 12; // 例: 一度に10件のデータを取得
  const [sortOrder] = useGlobalState<'distanceAsc' | 'mtPeakDesc' | 'mtUphillTimeAsc' | 'mtUphillTimeDesc' | undefined>(
    'mtFacilityOrderBy',
    'distanceAsc'
  );

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.mtFacilities.findManyRaw.useInfiniteQuery(
    {
      coordinates: lat && lng ? {lat, lng, radius: 100000} : undefined, // 100km
      orderBy: sortOrder,
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

  return {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage};
}
