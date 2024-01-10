import {Fragment} from 'react';
import {InfiniteScroll} from 'src/components/InfiniteScroll';
import EmptyData from 'src/components/EmptyData';
import PostCreateButton from 'src/components/post/post-create-button';

import type PostGet from '../../../sections/_mountain/detail/c/post-list-and-order/api';
import PostListItem, {PostListItemSkeleton} from './c/post-list-item';

type PostListCProps = {
  posts: ReturnType<typeof PostGet>['posts'];
  moreButtonPath?: string;
  fetchNextPage: () => void;
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  creteOnClick?: () => void;
};
const PostListC = ({posts, moreButtonPath, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, creteOnClick}: PostListCProps) => {
  /* ローディング */

  if (posts === undefined && isLoading) {
    return <PostListItemSkeleton />;
  }
  /* データがないとき */
  if (posts === undefined) return <EmptyData />;

  return (
    <>
      {/* 投稿 */}
      <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage}>
        {posts.map((post, i) => (
          <Fragment key={i}>
            <PostListItem post={post} i={i} />
          </Fragment>
        ))}
      </InfiniteScroll>
      {creteOnClick && <PostCreateButton onClick={creteOnClick} />}
    </>
  );
};

export default PostListC;
