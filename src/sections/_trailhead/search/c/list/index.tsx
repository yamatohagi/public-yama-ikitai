import {Fragment} from 'react';
import {TrailheadTransformedType} from 'server/routers/mt-to-trail-head/functions/organize';
import {Grid, Link} from '@mui/material';
import NextLink from 'next/link';
import {paths} from 'src/routes/paths';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import {InfiniteScroll} from 'src/components/InfiniteScroll';
import PostListItem from './c/list-item';
import ListItemSkeleton from './c/list-item/skeleton';

type PostListCProps = {
  posts: TrailheadTransformedType[] | undefined;
  moreButtonPath?: string;
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
const Lists = ({posts, moreButtonPath, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage}: PostListCProps) => {
  const [, setActiveTab] = useGlobalState('trailheadDetailTabValue', 'すべて');

  /* handle */
  const handleTransition = () => {
    // 遷移時に一緒に呼ばれる関数、これにreset系の処理を入れる
    setActiveTab('すべて');
  };

  if (posts === undefined && isLoading) {
    return (
      <>
        {Array.from({length: 10}, (_, i) => (
          <ListItemSkeleton key={i} />
        ))}
      </>
    );
  }
  if (posts === undefined) {
    return <div>結果がありません</div>;
  }
  return (
    <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage}>
      {posts.map((post, i) => (
        <Grid item xs={12} sm={6} key={i}>
          <Link component={NextLink} href={`${paths.trailhead.index.path}/${post.id}`} color="inherit" underline="none" onClick={handleTransition}>
            <PostListItem trailhead={post} i={i} />
          </Link>
        </Grid>
      ))}
    </InfiniteScroll>
  );
};

export default Lists;
