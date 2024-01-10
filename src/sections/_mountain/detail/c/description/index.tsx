import {Grid} from '@mui/material';
import {css} from 'styled-system/css';

export default function Description({description}: {description: string | null}) {
  return (
    <Grid item xs={12} sm={12}>
      <div className={css({mt: '0.8rem', fontSize: '0.8rem', color: '#636363', letterSpacing: '0.1rem', mx: 1})}>{description}</div>

      <div style={{display: 'flex', justifyContent: 'center', marginTop: '0.5rem'}}>
        <div
          style={{
            width: '97%',
            height: '0.08rem',
            background: '#EDEDED',
          }}
        />
      </div>
    </Grid>
  );
}
