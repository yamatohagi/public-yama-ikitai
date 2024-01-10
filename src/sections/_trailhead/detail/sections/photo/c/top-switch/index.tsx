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
    <Grid item xs={12} sm={12} style={{backgroundColor: initialTab === '登山口に関連する写真' ? '#F5F5F5' : '#FFFFFF'}}>
      <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
        <button type="button" onClick={() => handleClick('登山口に関連する写真')} className={css({width: '100%'})}>
          <span
            style={{color: initialTab === '登山口に関連する写真' ? '#367b9d' : '#4A4A4A'}}
            className={css({
              fontSize: '0.97rem',
              marginRight: '10px',
              fontWeight: 'semibold',
            })}
          >
            登山口に関連する写真
          </span>
        </button>
      </div>
    </Grid>
  );
}

export default memo(TopSwitch);
