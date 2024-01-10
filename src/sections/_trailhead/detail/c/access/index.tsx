import ContentHeader from 'src/components/ui/content-header';

import AccessMethodButton from './c/access-method-button';
import StartPointRadioButton from './c/start-point-radio-button';
import SortOptionButtonGroup from './c/sort-option-button-group';
import RoutePlanView from './c/route-plan-view';
import {TrailheadGetReturnType} from '../../api';
import RoadBlock from './c/road-block';

type AccessProps = {
  trailhead: TrailheadGetReturnType;
};

export default function Access({trailhead}: AccessProps) {
  return (
    <>
      <ContentHeader title="登山口までのアクセス" />
      {/* 自家用車、公共機関を選択するボタン */}
      <AccessMethodButton />
      {/* 出発地点 */}
      <StartPointRadioButton />
      {/* 早い順、安い順、乗換少ない順 */}
      <SortOptionButtonGroup />
      {/* ルート */}
      <RoutePlanView />
      {/* 通行止め情報 */}
      <RoadBlock trailhead={trailhead} />
    </>
  );
}
