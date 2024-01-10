import {Grid, Skeleton} from '@mui/material';
import {css} from 'styled-system/css';

type SiteTitleProps = {
  name?: string | string[];
};
export default function SiteTitle({name}: SiteTitleProps) {
  // ここでmtを取得する†
  return (
    <Grid item xs={12} sm={12} sx={{mt: 5}}>
      {name ? <div className={css({fontSize: '1.7rem', fontWeight: 'bold', ml: 2})}>{name}</div> : <Skeleton width="70%" height="4.5rem" />}
    </Grid>
  );
}
