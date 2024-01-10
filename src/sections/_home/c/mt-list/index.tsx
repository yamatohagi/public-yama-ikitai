import {memo} from 'react';
import {css} from 'styled-system/css';
import {trpc} from 'src/utils/trpc';
import {NMountainFindManySchema} from 'server/schemas/findManyMountain.schema';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';
import {useGlobalState} from 'src/components/provider/useGlobalStore';

import MtListItems from './c/mt-items';

function RecommendMtList() {
  const itemsPerPage = 8;

  const [mtSearchSetting] = useMtSearchSetting();

  const [sortOrder] = useGlobalState<(typeof NMountainFindManySchema)['_type']['orderBy']>('homeMtOrderBy', 'distanceAsc'); // 初期値は'asc'（昇順）

  const query: (typeof NMountainFindManySchema)['_type'] = {
    dayMoveMaxTime: mtSearchSetting.dayMoveMaxTime,
    stayStartTime: mtSearchSetting.stayStartTime,
    startDayOfWeek: mtSearchSetting.startDayOfWeek,
    from: mtSearchSetting.from,
    orderBy: sortOrder,
    cursor: 0,
    limit: itemsPerPage,
  };
  // type SomeType = Prisma.MountainGetPayload<typeof query & typeof findManyMountainArgs>;
  const {data} = trpc.mountains.findMany.useQuery(query, {});
  const mountains = data?.result;

  return (
    <div className={css({paddingTop: '0.9rem'})}>
      {/* 山の一覧 */}
      <MtListItems mountains={mountains} isLoading={!data} />
    </div>
  );
}

export default memo(RecommendMtList);
