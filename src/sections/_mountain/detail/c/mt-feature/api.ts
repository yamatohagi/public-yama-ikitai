import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';
import {GetMtFeaturesTspAtom} from './state';

export function MtFeatureGet() {
  const router = useRouter();
  const mtId = Number(router.query.id);
  const [refetchTimeStamp] = useAtom(GetMtFeaturesTspAtom);

  /* データ取得 */
  const {data, refetch} = trpc.mtFeature.findManyPhotoHashtag.useQuery(
    {mountainId: mtId},
    {
      enabled: !router.isReady,
    }
  );

  useEffect(() => {
    if (router.isReady) refetch();
  }, [refetchTimeStamp]);

  return {data};
}
