import {useRouter} from 'next/router';
import {atomWithStorage, createJSONStorage} from 'jotai/utils';
import {useMemo} from 'react';
import {findManyInfiniteScrollSchema} from 'server/routers/post/schemas/findManyInfiniteScrollSchema';
import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';

const OrderAtom = atomWithStorage<(typeof findManyInfiniteScrollSchema)['_type']['orderBy']>(
  'src/sections/_mt-facility/detail/c/post/api.ts',
  'createdAtDesc',
  createJSONStorage(() => sessionStorage)
);

export default function PostGet() {
  const limit = 15;
  const router = useRouter();
  const {id} = router.query;

  // 並び順
  const orderState = useAtom(OrderAtom);
  const [orderBy] = orderState;

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.post.findManyInfiniteScroll.useInfiniteQuery(
    {
      mtFacilityId: Number(id),
      orderBy,
      limit,
    },
    {
      enabled: !!router.isReady,
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
    }
  );
  // コレを投稿に変えて末端に渡してpostのエラーを直す
  const posts = useMemo(() => rPostPages?.pages.flatMap((page) => ('posts' in page ? page.posts : page)), [rPostPages]);

  const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

  return {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState};
}
