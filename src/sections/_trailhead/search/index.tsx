import {PrefectureSearchModal} from 'src/sections/_post/search/c/prefecture-search-modal';
import {VariousSearchModal} from 'src/sections/_post/search/c/various-search-modal';

import ResultCount from 'src/components/post/post-result-count';
import OrderSelectbox from 'src/components/order-selectbox';
import Filter from './c/filter';

import {GetTrailheadList} from './api';
import Lists from './c/list';

export const TrailheadSearch = () => {
  const {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState} = GetTrailheadList();

  return (
    <>
      <PrefectureSearchModal />
      <VariousSearchModal />

      <Filter />

      <ResultCount count={count?.[0] || 0} />
      <OrderSelectbox
        orderState={orderState}
        options={[
          // {value: 'distanceAsc', label: '現在地から近い順'},
          {value: 'mtPeakDesc', label: '標高が高い順'}, // これ効かないね
        ]}
      />

      <Lists posts={posts} fetchNextPage={fetchNextPage} isLoading={isLoading} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage} />
    </>
  );
};
