import {Grid, Skeleton} from '@mui/material';

export const FacilitySpecificsItemSkeleton = () => (
  <>
    <Grid item xs={12} sm={12} sx={{mt: 5}}>
      <Skeleton width="70%" height="4.5rem" />
    </Grid>
    <Grid item xs={12} sm={12} sx={{}}>
      <Skeleton width="70%" height="4.5rem" />
    </Grid>
    <Grid item xs={12} sm={12} sx={{mt: 1.0}} style={{display: 'flex', color: '#636363'}}>
      <Skeleton width="60%" height="1.9rem" />
    </Grid>
  </>
);
