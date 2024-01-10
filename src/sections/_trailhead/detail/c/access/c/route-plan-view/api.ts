import {useAtom} from 'jotai';
import {useRouter} from 'next/router';
import {useEffect} from 'react';
import {trpc} from 'src/utils/trpc';
import {AccessMethodButtonValueAtom} from '../access-method-button';
import {SortOptionButtonGroupValueAtom} from '../sort-option-button-group';
import {StartPointRadioButtonOptionsAtom, StartPointRadioButtonValueAtom} from '../start-point-radio-button';

export function getTrailheadRoutesApi(trailheadId: string | undefined) {
  return trpc.trailheadRouteGroup.findManyWithRoute.useQuery({where: {trailheadId: Number(trailheadId)}}, {enabled: !!trailheadId});
}

export function GetTrailheadRoutes() {
  const router = useRouter();
  const trailheadId = router.query.id;
  const [options, setOptions] = useAtom(StartPointRadioButtonOptionsAtom);

  let {data: routes} = getTrailheadRoutesApi(trailheadId?.toString());

  const [accessMethodButtonValue] = useAtom(AccessMethodButtonValueAtom);
  const [sortOptionButtonGroupValue] = useAtom(SortOptionButtonGroupValueAtom);
  const [startPointRadioButtonValue] = useAtom(StartPointRadioButtonValueAtom);
  routes = routes?.filter((route) => route.type === accessMethodButtonValue); // 自家用車と公共交通機関のルートを分ける

  // ルートの配列を取り出す
  let filteredRoute = routes?.map((route) => route);
  // スタート地点だけの配列を作る
  const startPointArray = [...new Set(routes?.map((route) => route.routes[0]?.name).filter(Boolean))];

  // ここ選択肢のためにやってるけど気持ち悪いな
  useEffect(() => {
    if (!startPointArray) return;
    if (JSON.stringify(startPointArray) !== JSON.stringify(options)) {
      setOptions(startPointArray);
    }
  }, [startPointArray, options]);

  // スタート地点を絞る
  filteredRoute = filteredRoute?.filter((routeObj) => routeObj.routes[0]?.name === startPointRadioButtonValue);

  if (routes === undefined) return undefined;

  return sortRoutes(filteredRoute, sortOptionButtonGroupValue);
}

export function sortRoutes(routes: ReturnType<typeof getTrailheadRoutesApi>['data'] | undefined, option: 'fastest' | 'cheapest' | 'fewestTransfers') {
  if (!routes) return [];

  return routes.sort((a, b) => {
    const routeA = a.routes;
    const routeB = b.routes;

    switch (option) {
      case 'fastest': {
        const totalTimeA = routeA.reduce((acc, segment) => acc + (segment.time || 0), 0);
        const totalTimeB = routeB.reduce((acc, segment) => acc + (segment.time || 0), 0);
        return totalTimeA - totalTimeB;
      }
      case 'cheapest': {
        const totalPaymentA = routeA.reduce((acc, segment) => acc + (segment.payment || 0), 0);
        const totalPaymentB = routeB.reduce((acc, segment) => acc + (segment.payment || 0), 0);
        return totalPaymentA - totalPaymentB;
      }
      case 'fewestTransfers':
        return routeA.length - routeB.length;
      default:
        return 0;
    }
  });
}
