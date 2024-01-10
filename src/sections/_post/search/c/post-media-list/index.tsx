import ResultCount from 'src/components/post/post-result-count';
import Order from 'src/components/order-selectbox';
import PostMedium from 'src/components/post/post-medium';
import {Provider} from 'jotai';

import GetPostPhotos from './api';
import {FloatingActionButton} from '../../../../../components/post/create/floating-button-for-flexible-input';

export default function PostMediaList() {
  const {searchedPhotoItems, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, refetch} = GetPostPhotos();

  return (
    <>
      {/* 新規投稿のボタン */}
      <Provider>
        <FloatingActionButton refetch={refetch} />
      </Provider>

      <ResultCount count={count?.[0] || 0} />
      <Order
        orderState={orderState}
        options={[
          {value: 'likeDesc', label: '人気順'},
          {value: 'createdAtDesc', label: '新着順'},
        ]}
      />
      <PostMedium
        searchedPhotoItems={searchedPhotoItems}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        iMode
      />
    </>
  );
}
