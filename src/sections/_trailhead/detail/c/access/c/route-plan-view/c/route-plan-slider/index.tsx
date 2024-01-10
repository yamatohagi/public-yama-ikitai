import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import {css} from 'styled-system/css';
import {useEffect, useRef} from 'react';
import {useAtom} from 'jotai';
import RoutePlanItem from './c/item';
import type {getTrailheadRoutesApi} from '../../api';
import {AccessMethodButtonValueAtom} from '../../../access-method-button';
import {SortOptionButtonGroupValueAtom} from '../../../sort-option-button-group';
import {StartPointRadioButtonValueAtom} from '../../../start-point-radio-button';

type RoutePlanSliderProps = {
  routes: ReturnType<typeof getTrailheadRoutesApi>['data'];
};
export default function RoutePlanSlider({routes}: RoutePlanSliderProps) {
  const splideRef = useRef<Splide | null>(null);

  // 条件が変わった時に1ぺージ目に戻る
  const [accessMethodButtonValue] = useAtom(AccessMethodButtonValueAtom);
  const [sortOptionButtonGroupValue] = useAtom(SortOptionButtonGroupValueAtom);
  const [startPointRadioButtonValue] = useAtom(StartPointRadioButtonValueAtom);

  useEffect(() => {
    if (!splideRef.current) return;
    splideRef.current.go(0);
  }, [accessMethodButtonValue, sortOptionButtonGroupValue, startPointRadioButtonValue]);

  return (
    <Splide ref={splideRef} hasTrack={false} aria-label="..." options={{arrows: true}} className={css({mt: 2, mb: 5, width: '100%'})}>
      <ul className={`splide__pagination `} style={{top: '102%'}} />
      <div className="custom-wrapper">
        <SplideTrack>
          {routes?.map((routeGroup, index) => (
            <SplideSlide key={index}>
              {/* ここItem */}
              <RoutePlanItem routeGroup={routeGroup} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </div>
    </Splide>
  );
}
