import {useAtom} from 'jotai';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {trpc} from 'src/utils/trpc';
import {GetMtFacilityTspAtom} from '../edit-modal/state';

export default function GetMtFacility() {
  const router = useRouter();
  const mtId = Number(router.query.id);
  const [updatedRefetch] = useAtom(GetMtFacilityTspAtom);

  const {data: mtToMtFacility, refetch} = trpc.mtToMtFacility.findManyByMtDetail.useQuery(
    {
      mountainId: mtId,
    },
    {enabled: !!mtId}
  );

  useEffect(() => {
    refetch();
  }, [updatedRefetch]);
  return {mtToMtFacility, mtId};
}
