import {useRouter} from 'next/router';
import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {MtTrailheadType} from './c/mt-trailhead/type';
import {GetTrailheadsTspAtom} from './state';

export function GetTrailheads() {
  const [tsp] = useAtom(GetTrailheadsTspAtom);
  const router = useRouter();
  const mtId = Number(router.query.id);

  //* データ取得 *//
  const {data, refetch} = trpc.mtTrailHeads.findMany.useQuery<any, MtTrailheadType[]>(
    {
      where: {mountainId: mtId},
      include: {
        Trailhead: {
          include: {
            TrailheadRating: true,
            Parking: true,
          },
        },
      },
      orderBy: {uphillTime: 'asc'},
    },
    {
      enabled: !!mtId,
    }
  );

  useEffect(() => {
    refetch();
  }, [tsp]);

  return {data};
}
