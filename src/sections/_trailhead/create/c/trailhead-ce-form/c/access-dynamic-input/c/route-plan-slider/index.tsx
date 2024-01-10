import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import {css} from 'styled-system/css';
import {useRef} from 'react';
import {atom} from 'jotai';
import {getTrailheadRoutesApi} from 'src/sections/_trailhead/detail/c/access/c/route-plan-view/api';
import {RHFSelectBox} from 'src/components/hook-form';

import {Button, Typography} from '@mui/material';
import usTrailheadForm from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import Iconify from 'src/components/iconify';

import TrailheadRouteGroupTypeSchema from 'generated/schema/zod/inputTypeSchemas/TrailheadRouteGroupTypeSchema';
import {RoutesInput} from '../routes-input';

type RoutePlanSliderProps = {
  routes: ReturnType<typeof getTrailheadRoutesApi>['data'];
  remove: any;
  append: any;
  methods: ReturnType<typeof usTrailheadForm>;
};

export const SplideRefAtom = atom<Splide | null>(null);

export default function RoutePlanSlider({routes, remove, methods, append}: RoutePlanSliderProps) {
  const splideRef = useRef<Splide | null>(null);
  const movePage = (page: number) => splideRef.current?.go(page);

  return (
    <>
      {/* ページ追加ボタン */}

      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4}}>
        <div />
        <div>
          <Button
            sx={{mr: 0.5, color: '#FA541C'}}
            onClick={() => {
              append({type: TrailheadRouteGroupTypeSchema.Enum.myCar, routes: []});
              setTimeout(() => {
                movePage(routes?.length || 0 + 2);
              }, 100);
            }}
          >
            <Iconify icon="fluent:tab-add-24-filled" width={24} sx={{mr: 0.6}} /> ページ追加
          </Button>
        </div>
      </div>
      {(routes?.length || 0) > 0 ? (
        <Splide ref={splideRef} hasTrack={false} aria-label="..." options={{arrows: true}} className={css({mt: 2, mb: 10, width: '100%'})}>
          <ul className={`splide__pagination `} style={{top: '102%'}} />
          <div className="custom-wrapper">
            <SplideTrack>
              {routes?.map((routeGroup, index) => (
                <SplideSlide key={index}>
                  <div style={{display: 'flex', justifyContent: 'end'}}>
                    <div style={{display: 'flex', marginBottom: 4}}>
                      <RHFSelectBox
                        nullable={false}
                        size="small"
                        name={`TrailheadRouteGroup.${index}.type`}
                        options={Object.keys(TrailheadRouteGroupTypeSchema.Enum).map((key) => ({
                          label: (TrailheadRouteGroupTypeSchemaJp as any)[key], // todo: fix
                          value: key,
                        }))}
                      />
                      <Button
                        sx={{width: '200px', color: '#808080'}}
                        onClick={() => {
                          movePage(index - 1);
                          setTimeout(() => {
                            remove(index);
                          }, 500);
                        }}
                      >
                        <Iconify icon="mdi:library-remove-outline" width={24} sx={{mr: 0.8}} /> ページ削除
                      </Button>
                    </div>
                  </div>

                  {/* ルートのインプット */}
                  <RoutesInput groupName={`TrailheadRouteGroup.${index}`} groupIndex={index} methods={methods} />
                </SplideSlide>
              ))}
            </SplideTrack>
          </div>
        </Splide>
      ) : (
        <Typography variant="subtitle2" color="636363" sx={{px: 1, mb: 3, ml: '1rem'}}>
          *ページ追加のボタンからルートを追加してください
        </Typography>
      )}
    </>
  );
}

type TrailheadRouteGroupTypeEnumKeys = keyof typeof TrailheadRouteGroupTypeSchema.Enum;

const TrailheadRouteGroupTypeSchemaJp: Record<TrailheadRouteGroupTypeEnumKeys, string> = {
  publicTransport: '公共交通機関',
  myCar: '車',
};
