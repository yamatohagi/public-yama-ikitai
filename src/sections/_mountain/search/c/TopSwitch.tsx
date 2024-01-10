import {Grid} from '@mui/material';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {css} from 'styled-system/css';

function TopSwitch({initialTab}: {initialTab: string}) {
  const router = useRouter();

  const handleClick = (endPath: string) => {
    router.replace(`/${endPath}`);
  };

  return (
    <>
      <Grid item xs={4} sm={4} style={{backgroundColor: initialTab === '山' ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('mountains')} className={css({width: '100%'})}>
            <span
              style={{color: initialTab === '山' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',

                marginLeft: '10px',
                fontWeight: 'semibold',
              })}
            >
              山
            </span>
          </button>
        </div>
      </Grid>
      <Grid item xs={4} sm={4} style={{backgroundColor: initialTab === '登山口' ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('trailheads')} className={css({width: '100%'})}>
            <span
              style={{color: initialTab === '登山口' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              登山口
            </span>
          </button>
        </div>
      </Grid>
      <Grid item xs={4} sm={4} style={{backgroundColor: initialTab === '山小屋' ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('mt-facilities')} className={css({width: '100%'})}>
            <span
              style={{color: initialTab === '山小屋' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              山小屋
            </span>
          </button>
        </div>
      </Grid>
    </>
  );
}

export default memo(TopSwitch);
