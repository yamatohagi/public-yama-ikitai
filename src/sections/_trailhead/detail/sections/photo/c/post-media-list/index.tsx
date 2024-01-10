import PostMedium from 'src/components/post/post-medium';
import OrderSelectbox from 'src/components/order-selectbox';

import ResultCount from 'src/components/post/post-result-count';
import GetMtFacilityPhotos from './api';

export default function PostMediaList() {
  const {searchedPhotoItems, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState} = GetMtFacilityPhotos();

  return (
    <>
      <ResultCount count={count?.[0] || 0} />
      <OrderSelectbox
        orderState={orderState}
        options={[
          {value: 'createdAtDesc', label: '新着順'},
          {value: 'likeDesc', label: '人気順'},
        ]}
      />
      <PostMedium
        searchedPhotoItems={searchedPhotoItems}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        hasNextPage={!!hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </>
  );
}
