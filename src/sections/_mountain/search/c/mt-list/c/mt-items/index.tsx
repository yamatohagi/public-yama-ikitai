import {Fragment} from 'react';
import MountainListItem from 'src/components/feature/mountain/MountainListItem';
import {inferProcedureOutput} from '@trpc/server';
import {AppRouter} from 'server/routers/_app';
import MtListItemSkeleton from 'src/components/feature/mountain/Skeleton';
import {InfiniteScroll} from 'src/components/InfiniteScroll';

type MountainType = inferProcedureOutput<AppRouter['mountains']['findMany']>;

type MtListItemsProps = {
  mountains: MountainType['result'] | undefined;
  isLoading: boolean;
  count: number | undefined;
  itemsPerPage: number;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
export default function MtListItems({mountains, isLoading, count, itemsPerPage, fetchNextPage, hasNextPage, isFetchingNextPage}: MtListItemsProps) {
  if (mountains === undefined && isLoading) {
    return (
      <>
        {Array.from({length: 10}, (_, i) => (
          <Fragment key={i}>
            <MtListItemSkeleton />
          </Fragment>
        ))}
      </>
    );
  }

  if (mountains === undefined) {
    return <div>結果がありません</div>;
  }

  return (
    <InfiniteScroll fetchNextPage={fetchNextPage} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage}>
      {mountains.map((m, i) => (
        <Fragment key={i}>
          <MountainListItem mountain={m} />
        </Fragment>
      ))}
    </InfiniteScroll>
  );
}
