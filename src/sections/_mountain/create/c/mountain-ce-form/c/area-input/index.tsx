import {Grid, Skeleton, Typography} from '@mui/material';
import {RHFSelectBox} from 'src/components/hook-form';
import useResponsive from 'src/hooks/useResponsive';
import RequiredTag from 'src/components/ui/RequiredTag';
import {GetMtAreaList} from './api';

export default function MtAreaInput() {
  const {mtAreaList, isLoading} = GetMtAreaList();
  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !mtAreaList) {
    return <MtAreaInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!mtAreaList) {
    return <>エリアが登録されていません</>;
  }
  return (
    <Grid item xs={12} sm={6} sx={{mt: 1.5}}>
      <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
        <RequiredTag /> エリア
      </Typography>
      <RHFSelectBox
        size="small"
        name="mtAreaId"
        options={mtAreaList.map((area) => ({
          label: area.name,
          value: area.id,
        }))}
      />
    </Grid>
  );
}

const MtAreaInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
      エリア
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
