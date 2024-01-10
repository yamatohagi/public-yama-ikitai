import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import TopSwitch from '../top-switch';

export default function FilterAndTag({initialTab}: {initialTab: string}) {
  return (
    <Grid
      container
      className={css({
        position: 'relative',
        backgroundColor: '#F5F5F5',
      })}
    >
      <TopSwitch initialTab={initialTab} />
    </Grid>
  );
}
