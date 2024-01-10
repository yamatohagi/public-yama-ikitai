import {trpc} from 'src/utils/trpc';
import {NMountainFindManySchema} from 'server/schemas/findManyMountain.schema';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';
import {useGlobalState} from 'src/components/provider/useGlobalStore';

type GetMountainListProps = {
  lng?: number | null;
  lat?: number | null;
};

export function GetMountainList({lng, lat}: GetMountainListProps) {
  const itemsPerPage = 8;
  const [mtSearchSetting] = useMtSearchSetting();

  // 並び順
  const [sortOrder] = useGlobalState<(typeof NMountainFindManySchema)['_type']['orderBy']>('mtOrderBy', 'distanceAsc'); // 初期値は'asc'（昇順）

  const query: (typeof NMountainFindManySchema)['_type'] = {
    coordinates: lat && lng ? {lat, lng, radius: mtSearchSetting.coordinatesRadius} : undefined, // 100km
    dayMoveMaxTime: mtSearchSetting.dayMoveMaxTime,
    stayStartTime: mtSearchSetting.stayStartTime,
    startDayOfWeek: mtSearchSetting.startDayOfWeek,
    from: mtSearchSetting.from,
    orderBy: sortOrder,
    cursor: 0,
    limit: itemsPerPage,
  };
  // type SomeType = Prisma.MountainGetPayload<typeof query & typeof findManyMountainArgs>;
  const {data} = trpc.mountains.findMany.useQuery(query, {
    staleTime: 6000,
    networkMode: 'always',
  });
  const mountains = data?.result;

  return {mountains};
}
