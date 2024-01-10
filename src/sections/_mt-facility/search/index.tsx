import OrderSelectbox from 'src/components/order-selectbox';
import ResultCount from 'src/components/post/post-result-count';
import Filter from './c/filter';
import {GetTrailheadList} from './api';
import Lists from './c/list';

const MtFacilitySearch = () => {
  const {posts, count, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage, orderState} = GetTrailheadList();

  return (
    <>
      <Filter />

      <ResultCount count={count?.[0] || 0} />
      <OrderSelectbox
        orderState={orderState}
        options={[
          {value: 'distanceAsc', label: '現在地から近い順'},
          {value: 'mtPeakDesc', label: '標高が高い順'},
        ]}
      />

      <Lists posts={posts} fetchNextPage={fetchNextPage} isLoading={isLoading} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage} />
    </>
  );
};

export default MtFacilitySearch;
