import {Grid, Typography} from '@mui/material';
import Divider from 'src/components/ui/Divider';
import RequiredTag from 'src/components/ui/RequiredTag';
import useResponsive from 'src/hooks/useResponsive';
import RHFCheckboxGroup from 'src/components/hook-form/RHFCheckboxGroup';
import {GetMtFacilityType} from './api';

export default function PayMethodInput({dividerCss}: {dividerCss: string}) {
  const isMdUp = useResponsive('up', 'md');
  const {list} = GetMtFacilityType();

  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 1.5}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left">
          決済情報
        </Typography>
        <RHFCheckboxGroup name="PayMethodIds" options={list?.map((obj) => ({label: obj.name, value: obj.id})) || []} />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Divider className={dividerCss} width="100%" />
      </Grid>
    </>
  );
}
