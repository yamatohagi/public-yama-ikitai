import {trpc} from 'src/utils/trpc';

import {useMemo} from 'react';
import {useRouter} from 'next/router';

export const usePostListGet = (likeOnly?: boolean, myPageUserId?: string, replyOnly?: boolean) => {
  const limit = 24; // 例: 一度に10件のデータを取得
  const router = useRouter();
  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.post.findManyUserProfilePost.useInfiniteQuery(
    {
      userId: myPageUserId || router.query.id?.toString() || '',
      likeOnly,
      replyOnly,
      limit,
    },
    {
      getNextPageParam: (lastPage) => ('nextCursor' in lastPage ? lastPage.nextCursor : undefined),
      enabled: !!router.isReady,
    }
  );
  // コレを投稿に変えて末端に渡してpostのエラーを直す
  const posts = useMemo(() => rPostPages?.pages.flatMap((page) => ('posts' in page ? page.posts : page)), [rPostPages]);
  // const count = useMemo(() => rPostPages?.pages.flatMap((page) => ('count' in page ? page.count : page)), [rPostPages]);

  return {posts, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage};
};
