import {Grid, IconButton, Typography} from '@mui/material';
import {useFieldArray} from 'react-hook-form';
import Iconify from 'src/components/iconify';
import useResponsive from 'src/hooks/useResponsive';
import useMtFacilityForm from 'src/sections/_mt-facility/create/hooks/useMtFacilityForm';
import {defaultInstance} from 'src/service/zodHelper';

import {BusinessPeriodCreateWithoutMtFacilityInputSchema} from 'server/routers/mt-facility/schemas/objects/MtFacilityCreateInput.schema';
import {Fragment} from 'react';
import DynamicInput from './c/dynemic-input';

type BusinessPeriodInputProps = {
  methods: ReturnType<typeof useMtFacilityForm>;
};
export default function BusinessPeriodInput({methods}: BusinessPeriodInputProps) {
  const {control} = methods;
  const isMdUp = useResponsive('up', 'md');

  const {fields, append, remove} = useDynamicInputProperty(control);
  /* handle */

  return (
    <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{mb: 0.5}}>
          営業期間
        </Typography>
      </div>

      {fields.map((field, index) => (
        <Fragment key={index}>
          <DynamicInput index={index} remove={remove} />
        </Fragment>
      ))}
      <Grid item xs={12} sm={12}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <IconButton onClick={() => append(defaultInstance(BusinessPeriodCreateWithoutMtFacilityInputSchema))} style={{color: '#367B9D'}}>
            <Iconify icon="ic:baseline-plus" sx={{width: 30, height: 30}} />
            <Typography variant="h6"> 追加</Typography>
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}

export function useDynamicInputProperty(control: ReturnType<typeof useMtFacilityForm>['control']) {
  const {fields, append, remove} = useFieldArray({
    name: 'BusinessPeriod',
    control,
  });
  return {fields, append, remove};
}
