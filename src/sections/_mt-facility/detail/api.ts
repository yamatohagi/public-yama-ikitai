/* eslint-disable import/no-named-as-default */
import {trpc} from 'src/utils/trpc';
import {useRouter} from 'next/router';

export const MtFacilityDetailGet = () => {
  const router = useRouter();
  const id = Number(router.query.id);

  const {data: mtFacility, refetch} = trpc.mtFacilities.findUniqueByDetail.useQuery({id}, {enabled: !!id});

  return {mtFacility, id, refetch};
};
