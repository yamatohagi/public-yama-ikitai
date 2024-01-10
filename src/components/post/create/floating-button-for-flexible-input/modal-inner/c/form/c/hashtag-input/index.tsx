import {Grid, Skeleton, Typography} from '@mui/material';
import useResponsive from 'src/hooks/useResponsive';
import {RHFMultiSelect} from 'src/components/hook-form/RHFMultipleSelect';
import {GeHashtagList} from './api';

export default function HashtagInput() {
  const {hashtagList, isLoading} = GeHashtagList();
  const isMdUp = useResponsive('up', 'md');

  if (isLoading && !hashtagList) {
    return <HashtagInputSkeleton isMdUp={!!isMdUp} />;
  }

  if (!hashtagList) {
    return <>シーンが登録されていません</>;
  }
  return (
    <Grid item xs={12} sm={6} sx={{mt: 1.5, mb: 4}}>
      <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
        シーン
      </Typography>
      <RHFMultiSelect
        size="small"
        name="hashtagIds"
        textFieldProps={{size: 'small', style: {paddingRight: 20}}}
        options={hashtagList.map((obj) => ({
          label: obj.tag,
          value: obj.id.toString(),
        }))}
      />
    </Grid>
  );
}

const HashtagInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#212121" align="left" sx={{mb: 0.5}}>
      シーン
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
