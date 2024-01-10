import {useRouter} from 'next/router';
import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {GetMountainRefetchTspAtom} from './state';

export default function GetMountain() {
  const router = useRouter();
  const [refetchTimeStamp] = useAtom(GetMountainRefetchTspAtom);
  const mtId = Number(router.query.id);
  const {data: mountain, isLoading, refetch} = trpc.mountains.findFirst.useQuery({where: {id: mtId}}, {enabled: !!router.isReady});

  useEffect(() => {
    if (router.isReady) refetch();
  }, [refetchTimeStamp]);

  return {mountain, isLoading, mtId, refetch};
}

export type GetMountainReturn = ReturnType<typeof GetMountain>;
