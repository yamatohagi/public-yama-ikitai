import {trpc} from 'src/utils/trpc';
import {useMemo} from 'react';
import {useGlobalState} from 'src/components/provider/useGlobalStore';

type GetTrailheadListProps = {
  lng?: number | null;
  lat?: number | null;
};

export function GetTrailheadList({lng, lat}: GetTrailheadListProps) {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 3; // 例: 一度に10件のデータを取得
  const [sortOrder] = useGlobalState<'distanceAsc' | 'mtPeakDesc' | 'mtUphillTimeAsc' | 'mtUphillTimeDesc' | undefined>(
    'trailheadOrderBy',
    'distanceAsc'
  );

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.mtTrailHeads.findManyRaw.useInfiniteQuery(
    {
      coordinates: lat && lng ? {lat, lng, radius: 100000} : undefined, // 100km

      orderBy: sortOrder,
      limit,
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
