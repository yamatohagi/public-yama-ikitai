import {Grid} from '@mui/material';
import PostListC from 'src/components/post/post-list';
import OrderSelectbox from 'src/components/order-selectbox';
import ResultCount from 'src/components/post/post-result-count';
import PostGet from './api';

export default function Post() {
  // mtIdとfeatureNameがないときは、何も表示しない
  const {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState} = PostGet();

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        {/* 検索結果〇〇件 */}
        <ResultCount count={count?.[0] || 0} />

        {/* 並び替え */}
        <OrderSelectbox
          orderState={orderState}
          options={[
            {value: 'createdAtDesc', label: '新着順'},
            {value: 'likeDesc', label: '人気順'},
          ]}
        />
      </Grid>

      <Grid item xs={12} sm={12}>
        {/* 投稿 */}
        <PostListC
          posts={posts}
          fetchNextPage={fetchNextPage}
          isLoading={isLoading}
          hasNextPage={!!hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          creteOnClick={() => {}}
        />
      </Grid>
    </Grid>
  );
}
