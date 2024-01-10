import {Grid, Skeleton} from '@mui/material';
import {trpc} from 'src/utils/trpc';
import {memo, useMemo} from 'react';
import PostListC from 'src/components/post/post-list';
import MoreButton from 'src/components/ui/MoreButton';
import {paths} from 'src/routes/paths';

function PostList() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const limit = 3; // 例: 一度に10件のデータを取得

  const {
    data: rPostPages,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
  } = trpc.post.findManyWithPhotos.useInfiniteQuery(
    {limit},
    {
      getNextPageParam: (lastPage) => undefined,
    }
  );
  // コレを投稿に変えて末端に渡してpostのエラーを直す
  const posts = useMemo(() => rPostPages?.pages.flatMap((page) => ('posts' in page ? page.posts : page)), [rPostPages]);

  if (posts === undefined) {
    return (
      <Grid container>
        <Skeleton variant="rectangular" width={300} height={300} />
      </Grid>
    );
  }

  return (
    <>
      <PostListC
        posts={posts}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
      <MoreButton link={`${paths.post.index.path}?tab=text`} label="もっと見る" />
    </>
  );
}
export default memo(PostList);
