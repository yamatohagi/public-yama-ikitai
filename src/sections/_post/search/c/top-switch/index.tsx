import {Grid} from '@mui/material';
import {memo} from 'react';
import {useTabState} from 'src/components/provider/tabState';
import {css} from 'styled-system/css';

function TopSwitch({initialTab}: {initialTab: string}) {
  const {activeTab, setActiveTab} = useTabState(initialTab);

  const isActive = (tabName: string) => activeTab === tabName;

  return (
    <>
      <Grid item xs={6} sm={6} style={{backgroundColor: isActive('media') ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => setActiveTab('media')} className={css({width: '100%'})}>
            <span
              style={{color: isActive('media') ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',

                marginLeft: '10px',
                fontWeight: 'semibold',
              })}
            >
              画像・動画
            </span>
          </button>
        </div>
      </Grid>
      <Grid item xs={6} sm={6} style={{backgroundColor: isActive('text') ? '#F5F5F5' : '#FFFFFF'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => setActiveTab('text')} className={css({width: '100%'})}>
            <span
              style={{color: isActive('text') ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              活動
            </span>
          </button>
        </div>
      </Grid>
    </>
  );
}

export default memo(TopSwitch);
