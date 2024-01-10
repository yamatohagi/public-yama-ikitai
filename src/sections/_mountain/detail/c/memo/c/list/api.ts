import {useRouter} from 'next/router';
import {trpc} from 'src/utils/trpc';
import {useAtom} from 'jotai';
import {useEffect} from 'react';
import {GetMtMemoTspAtom} from './state';

export default function GetMemoList() {
  const router = useRouter();
  const mtId = Number(router.query.id);
  const [refetchTimeStamp] = useAtom(GetMtMemoTspAtom);

  //* データ取得 *//

  const {data: mtUrlMemos, refetch} = trpc.mtUrlMemo.findMany.useQuery(
    {
      where: {mountainId: mtId},
    },
    {
      enabled: !!mtId,
    }
  );
  useEffect(() => {
    if (router.isReady) refetch();
  }, [refetchTimeStamp]);

  return {mtUrlMemos};
}
