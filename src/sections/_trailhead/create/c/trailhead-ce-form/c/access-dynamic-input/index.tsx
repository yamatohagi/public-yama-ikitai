import {Typography} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import useTrailheadForm from 'src/sections/_trailhead/create/hooks/useTrailheadForm';
import {TrailheadRouteGroupSchema} from 'server/routers/trailhead/objects/TrailheadCreateInput.schema';
import {SegmentType} from '@prisma/client';
import {toN, toStr} from 'server/functions/toN';
import RoutePlanSlider from './c/route-plan-slider';

type AccessDynamicInputProps = {methods: ReturnType<typeof useTrailheadForm>};

export default function AccessDynamicInput({methods}: AccessDynamicInputProps) {
  const {control} = methods;
  const {append, remove} = useFieldArray({control, name: 'TrailheadRouteGroup'});

  const trailheadRouteGroupWatch = methods.watch('TrailheadRouteGroup');
  const routes = trailheadRouteGroupWatch ? trailheadRouteGroupOrganize(trailheadRouteGroupWatch) : [];

  return (
    <div style={{width: '100%'}}>
      <Typography variant="subtitle2" color="#323232" align="left" sx={{pl: 2.5}}>
        アクセス
      </Typography>

      {/* ルート */}
      <RoutePlanSlider routes={routes} methods={methods} remove={remove} append={append} />
    </div>
  );
}

function trailheadRouteGroupOrganize(trailheadRouteGroups: (typeof TrailheadRouteGroupSchema)['_type'][]) {
  const route = trailheadRouteGroups.map((routeGroup) => {
    const routes = routeGroup.routes.map((route) => ({
      id: 0,
      name: route.name,
      type: route.methodType as SegmentType,
      order: route.order,
      time: toN(route.time, {zero: true}),
      methodName: toStr(route.methodName),
      methodType: route.methodType === '' ? null : route.methodType,
      routeGroupId: 0,
      payment: toN(route.payment),
      url: toStr(route.url),
    }));

    return {
      id: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      trailheadId: 0,
      deletedAt: null,
      type: routeGroup.type,
      remark: routeGroup.remark || null,
      routes,
    };
  });
  return route;
}
