import {Grid, Skeleton, Typography} from '@mui/material';
import {RHFSelectBox} from 'src/components/hook-form';
import useResponsive from 'src/hooks/useResponsive';
import {GetTrailheadList} from './api';

export default function TrailheadInput() {
  const {mtList, isLoading} = GetTrailheadList();
  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !mtList) {
    return <TrailheadInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!mtList) {
    return <>登山口が登録されていません</>;
  }
  return (
    <Grid item xs={12} sm={6} sx={{mt: 1.5}}>
      <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
        登山口
      </Typography>
      <RHFSelectBox
        size="small"
        name="trailheadId"
        options={mtList.map((mt) => ({
          label: mt.name,
          value: mt.id,
        }))}
      />
    </Grid>
  );
}

const TrailheadInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
      登山口
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
