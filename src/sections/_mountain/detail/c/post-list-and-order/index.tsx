import {Grid} from '@mui/material';
import PostListC from 'src/components/post/post-list';
import ResultCount from 'src/components/post/post-result-count';
import Order from 'src/components/order-selectbox';
import PostGet from './api';

export default function PostList() {
  const {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState} = PostGet();

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        {/* 検索結果の部分 */}
        <ResultCount count={count?.[0] || 0} />
        {/* 並び順の部分 */}
        <Order
          orderState={orderState}
          options={[
            {value: 'createdAtDesc', label: '新着順'},
            {value: 'likeDesc', label: '人気順'},
          ]}
        />
      </Grid>
      {/* 投稿の一覧 */}
      <Grid item xs={12} sm={12}>
        <PostListC
          posts={posts}
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </Grid>
    </Grid>
  );
}
