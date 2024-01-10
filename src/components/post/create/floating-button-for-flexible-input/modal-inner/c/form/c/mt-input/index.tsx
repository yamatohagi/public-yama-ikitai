import {Grid, Skeleton, Typography} from '@mui/material';
import {RHFSelectBox} from 'src/components/hook-form';
import useResponsive from 'src/hooks/useResponsive';
import {GetMtList} from './api';

export default function MtInput() {
  const {mtList, isLoading} = GetMtList();
  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !mtList) {
    return <MtInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!mtList) {
    return <>山が登録されていません</>;
  }
  return (
    <Grid item xs={12} sm={6} sx={{mt: 1.5}}>
      <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
        山
      </Typography>
      <RHFSelectBox
        size="small"
        name="mtId"
        options={mtList.map((mt) => ({
          label: mt.name,
          value: mt.id,
        }))}
      />
    </Grid>
  );
}

const MtInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
      山
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
