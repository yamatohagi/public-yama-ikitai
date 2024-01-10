import {Grid} from '@mui/material';

import ResultCount from 'src/components/post/post-result-count';
import OrderSelectbox from 'src/components/order-selectbox';

// todo: ここphoto後撮りしてる
import PostListC from 'src/components/post/post-list';
import {FloatingActionButton} from 'src/components/post/create/floating-button-for-flexible-input';
import {Provider} from 'jotai';
import GetPostList from './api';

export default function PostList() {
  const {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState, refetch} = GetPostList();

  return (
    <>
      {/* 新規投稿のボタン */}
      <Provider>
        <FloatingActionButton refetch={refetch} />
      </Provider>
      <Grid container>
        <Grid item xs={12} sm={12}>
          {/* 検索結果の部分 */}
          <ResultCount count={count?.[0] || 0} />
          {/* 並び順の部分 */}

          <OrderSelectbox
            orderState={orderState}
            options={[
              {value: 'createdAtDesc', label: '新しい順'},
              {value: 'likeDesc', label: '人気順'},
            ]}
          />
        </Grid>

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
    </>
  );
}
