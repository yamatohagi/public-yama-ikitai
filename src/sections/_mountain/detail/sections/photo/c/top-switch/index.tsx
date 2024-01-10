import {Grid} from '@mui/material';
import {useRouter} from 'next/router';
import {memo} from 'react';
import {css} from 'styled-system/css';

function TopSwitch({initialTab}: {initialTab: string}) {
  const router = useRouter();

  const handleClick = (tabValue: string) => {
    router.replace({
      pathname: router.pathname, // 現在のパスをそのまま使用
      query: {...router.query, tab: tabValue}, // 既存のクエリを展開し、tabを更新
    });
  };

  return (
    <>
      <Grid item xs={6} sm={6} style={{backgroundColor: initialTab === 'すべて' ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('すべて')} className={css({width: '100%'})}>
            <span
              style={{color: initialTab === 'すべて' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              すべて
            </span>
          </button>
        </div>
      </Grid>
      <Grid item xs={6} sm={6} style={{backgroundColor: initialTab === 'この山が見える' ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('この山が見える')} className={css({width: '100%'})}>
            <span
              style={{color: initialTab === 'この山が見える' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',

                marginLeft: '10px',
                fontWeight: 'semibold',
              })}
            >
              この山が見える
            </span>
          </button>
        </div>
      </Grid>
    </>
  );
}

export default memo(TopSwitch);
