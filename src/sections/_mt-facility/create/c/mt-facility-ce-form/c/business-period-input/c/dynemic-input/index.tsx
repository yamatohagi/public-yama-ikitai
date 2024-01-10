import {Grid, IconButton, Typography} from '@mui/material';
import {RHFSelectBox} from 'src/components/hook-form';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';

import RHFDatePicker from 'src/components/hook-form/RHFDate';
import type {useDynamicInputProperty} from '../..';

type DynamicInputProps = {
  index: number;

  remove: ReturnType<typeof useDynamicInputProperty>['remove'];
};
export default function DynamicInput({index, remove}: DynamicInputProps) {
  const isMdUp = useResponsive('up', 'md');

  /* handle */
  const handleRemove = (index: number) => {
    remove(index);
  };

  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: index === 0 ? 0 : 2}}>
        <IconButton onClick={() => handleRemove(index)}>
          <Iconify icon="mdi:remove-bold" sx={{width: 30, height: 30, marginLeft: -1}} />
        </IconButton>
        <Grid item xs={12} sm={12} sx={{mt: 0}}>
          <RHFSelectBox
            style={{marginRight: '10px', width: '150px'}}
            size="small"
            name={`BusinessPeriod.${index}.year`}
            label="(例)2024年"
            options={[
              {label: '2023', value: '2023'},
              {label: '2024', value: '2024'},
              {label: '2025', value: '2025'},
              {label: '2026', value: '2026'},
            ]}
          />
        </Grid>
        <Grid item xs={6} sm={6} sx={{mt: 2, ml: 1}}>
          <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
            営業開始
          </Typography>
          <RHFDatePicker label="" name={`BusinessPeriod.${index}.start`} />
        </Grid>
      </Grid>
      <Grid item xs={6} sm={6} sx={{mt: 1, ml: 1}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
          営業終了
        </Typography>
        <RHFDatePicker label="" name={`BusinessPeriod.${index}.end`} />
      </Grid>
    </>
  );
}
