import {Grid, Skeleton, Typography} from '@mui/material';
import {RHFSelectBox} from 'src/components/hook-form';
import useResponsive from 'src/hooks/useResponsive';
import {GetMtFacilityList} from './api';

export default function MtFacilityInput() {
  const {mtList, isLoading} = GetMtFacilityList();
  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !mtList) {
    return <MtFacilityInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!mtList) {
    return <>山小屋が登録されていません</>;
  }
  return (
    <Grid item xs={12} sm={6} sx={{mt: 1.5, mb: 4}}>
      <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
        山小屋
      </Typography>
      <RHFSelectBox
        size="small"
        name="mtFacilityId"
        options={mtList.map((mt) => ({
          label: mt.name,
          value: mt.id,
        }))}
      />
    </Grid>
  );
}

const MtFacilityInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
      山小屋
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
