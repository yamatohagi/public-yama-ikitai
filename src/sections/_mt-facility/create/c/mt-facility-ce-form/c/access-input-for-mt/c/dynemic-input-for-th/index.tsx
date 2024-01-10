import {Grid, IconButton, Skeleton, Typography} from '@mui/material';
import {RHFSelectBox, RHFTextArea} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import {generateDistanceOptions, generateTimeOptions} from 'src/utils/options';
import {GetMtList} from './api';
import type {useDynamicInputProperty} from '../..';

type DynamicInputProps = {
  index: number;

  remove: ReturnType<typeof useDynamicInputProperty>['remove'];
};
export default function DynamicInput({index, remove}: DynamicInputProps) {
  const {list, isLoading} = GetMtList();
  const isMdUp = useResponsive('up', 'md');

  /* handle */
  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <IconButton onClick={() => handleRemove(index)}>
        <Iconify icon="mdi:remove-bold" sx={{width: 30, height: 30}} />
      </IconButton>
      <Grid item xs={12} sm={12} sx={{mt: index === 0 ? 2 : 3}}>
        {!list ? (
          <>{isLoading ? <DynamicInputSkeleton isMdUp={!!isMdUp} /> : <>エリアが登録されていません</>}</>
        ) : (
          <RHFSelectBox
            size="small"
            name={`MountainToMtFacility.${index}.mountainId`}
            label="場所（例：双六岳）"
            options={list.map((obj) => ({
              label: obj.name,
              value: obj.id,
            }))}
          />
        )}
      </Grid>
      <Grid item xs={12} sm={12} sx={{mt: index === 0 ? 2 : 3}}>
        <RHFSelectBox size="small" name={`MountainToMtFacility.${index}.timeFrom`} label="所要時間（山頂まで）" options={generateTimeOptions()} />
      </Grid>
      <Grid item xs={12} sm={12} sx={{mt: index === 0 ? 2 : 3}}>
        <RHFSelectBox size="small" name={`MountainToMtFacility.${index}.timeTo`} label="所要時間（小屋まで）" options={generateTimeOptions()} />
      </Grid>

      <Grid item xs={12} sm={12} sx={{mt: index === 0 ? 2 : 3}}>
        <RHFSelectBox size="small" name={`MountainToMtFacility.${index}.distanceTo`} label="距離（片道)" options={generateDistanceOptions()} />
      </Grid>
      <Grid item xs={12} sm={12} sx={{mt: index === 0 ? 2 : 3}}>
        {/* 説明をつけるか一旦保留 */}
        <RHFTextArea size="small" name={`MountainToMtFacility.${index}.remark`} placeholder="ここが一番近い" />
      </Grid>
    </>
  );
}

const DynamicInputSkeleton = ({isMdUp}: {isMdUp: boolean}) => (
  <Grid item xs={12} sm={6}>
    <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{pl: 0.5, mb: 0.5}}>
      アクセス
    </Typography>
    <Skeleton variant="rectangular" width="100%" height={40} />
  </Grid>
);
