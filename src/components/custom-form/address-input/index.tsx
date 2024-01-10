import {Grid, Typography} from '@mui/material';
import {RHFSelectBox} from 'src/components/hook-form';
import RHFTextField from 'src/components/hook-form/RHFTextField';
import useResponsive from 'src/hooks/useResponsive';
import {prefecture} from 'src/utils/prefecture';

export default function AddressInput() {
  const isMdUp = useResponsive('up', 'md');

  return (
    <>
      <Grid item xs={5} sm={5} sx={{mt: 2.0}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
          郵便番号
        </Typography>
        <RHFTextField size="small" name="postalCode" placeholder="222-9990" sx={{}} />
      </Grid>
      <Grid item xs={7} sm={7} sx={{mt: 2.0}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{pl: 0.5}}>
          都道府県
        </Typography>
        <Grid item xs={12} sm={6}>
          <RHFSelectBox
            sx={{pl: 1}}
            size="small"
            name="prefecture"
            options={prefecture.map((prefecture) => ({
              label: prefecture,
              value: prefecture,
            }))}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={12} sx={{mt: 2.0}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
          住所1
        </Typography>
        <RHFTextField size="small" name="address1" placeholder="市区" sx={{}} />
      </Grid>
      <Grid item xs={12} sm={12} sx={{mt: 2.0}}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{}}>
          住所2
        </Typography>
        <RHFTextField size="small" name="address2" placeholder="町村番地以降" sx={{}} />
      </Grid>
      {/* <Grid item xs={12} sm={12}>
        <Typography variant={isMdUp ? 'subtitle1' : 'subtitle2'} color="#323232" align="left" sx={{pl: 0.5, mb: 0.5}}>
          住所3
        </Typography>
        <RHFTextField size="small" name="address3" placeholder="1-1-1" sx={{}} />
      </Grid> */}
    </>
  );
}
