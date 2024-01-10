import {Grid} from '@mui/material';
import RoutePlanSlider from './c/route-plan-slider';
import {GetTrailheadRoutes} from './api';

export default function RoutePlanView() {
  const routes = GetTrailheadRoutes();

  return (
    <Grid item xs={12} sm={12}>
      <RoutePlanSlider routes={routes} />
    </Grid>
  );
}
