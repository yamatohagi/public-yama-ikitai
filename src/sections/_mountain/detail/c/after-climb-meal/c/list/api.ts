import {useRouter} from 'next/router';
import {trpc} from 'src/utils/trpc';

export default function GetMemoList() {
  const router = useRouter();
  const mtId = Number(router.query.id);

  //* データ取得 *//

  const {data} = trpc.afterClimbMeal.findMany.useQuery(
    {
      where: {mtId},
    },
    {
      enabled: !!mtId,
    }
  );
  return {data};
}
