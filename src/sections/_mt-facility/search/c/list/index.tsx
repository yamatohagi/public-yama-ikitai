import {Fragment} from 'react';
import {Grid, Link} from '@mui/material';
import NextLink from 'next/link';
import {paths} from 'src/routes/paths';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import {InfiniteScroll} from 'src/components/InfiniteScroll';
import {transformTrailheads} from 'server/routers/mt-facility/functions/organize';
import PostListItem from './c/list-item';
import ListItemSkeleton from './c/list-item/skeleton';

type PostListCProps = {
  posts: ReturnType<typeof transformTrailheads> | undefined;
  moreButtonPath?: string;
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
const Lists = ({posts, moreButtonPath, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage}: PostListCProps) => {
  const [, setActiveTab] = useGlobalState('mtFacilityDetailTabValue', 'すべて');

  /* handle */
  const handleTransition = () => {
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
          <Link component={NextLink} href={`${paths.mtFacility.index.path}/${post.id}`} color="inherit" underline="none" onClick={handleTransition}>
            <PostListItem mtFacility={post} i={i} />
          </Link>
        </Grid>
      ))}
    </InfiniteScroll>
  );
};

export default Lists;
