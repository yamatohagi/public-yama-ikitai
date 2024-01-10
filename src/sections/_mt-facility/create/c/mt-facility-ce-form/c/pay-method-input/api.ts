import {trpc} from 'src/utils/trpc';

export function GetMtFacilityType() {
  const {data: list, refetch} = trpc.payMethod.findManyForMtFacilityCreateChoice.useQuery({});
  return {list, refetch};
}
