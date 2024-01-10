import {Fragment} from 'react';
import MountainListItem from 'src/components/feature/mountain/MountainListItem';
import {inferProcedureOutput} from '@trpc/server';
import {AppRouter} from 'server/routers/_app';
import MtListItemSkeleton from 'src/components/feature/mountain/Skeleton';
import MoreButton from 'src/components/ui/MoreButton';
import {paths} from 'src/routes/paths';

type MountainType = inferProcedureOutput<AppRouter['mountains']['findMany']>;

type MtListItemsProps = {
  mountains: MountainType['result'] | undefined;
  isLoading: boolean;
};
export default function MtListItems({mountains, isLoading}: MtListItemsProps) {
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
    <>
      {mountains.map((m, i) => (
        <Fragment key={i}>
          <MountainListItem mountain={m} />
        </Fragment>
      ))}
      <MoreButton link={`${paths.mountain.index.path}`} label="もっと見る" />
    </>
  );
}
