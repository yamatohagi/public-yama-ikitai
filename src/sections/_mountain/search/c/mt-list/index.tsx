import {memo} from 'react';
import {css} from 'styled-system/css';
import OrderSelectbox from 'src/components/order-selectbox';
import ResultCount from 'src/components/post/post-result-count';
import MtListItems from './c/mt-items';
import {GetMtList} from './api';

function MtList() {
  const {mountains, count, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage, orderState, itemsPerPage} = GetMtList();
  return (
    <div className={css({paddingTop: '0.9rem'})}>
      <div className={css({marginBottom: '20px'})}>
        {/* 検索結果の部分 */}
        <ResultCount count={count || 0} />
        {/* 並び順の部分 */}
        <OrderSelectbox
          orderState={orderState}
          options={[
            {value: 'distanceAsc', label: '現在地から近い順'},
            {value: 'mtPeakDesc', label: '標高が高い順'},
            {value: 'mtUphillTimeAsc', label: '登山時間が少ない順'},
            {value: 'mtUphillTimeDesc', label: '登山時間が多い順'},
          ]}
        />
      </div>
      {/* 山の一覧 */}
      <MtListItems
        mountains={mountains}
        count={count}
        itemsPerPage={itemsPerPage}
        fetchNextPage={fetchNextPage}
        isLoading={isLoading}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={!!hasNextPage}
      />
    </div>
  );
}

export default memo(MtList);
