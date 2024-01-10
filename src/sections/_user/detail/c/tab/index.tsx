import {css} from 'styled-system/css';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'src/components/provider/useGlobalStore';

const Tab = () => {
  const [tabS, setTabS] = useGlobalState('userProfileTabValue', 'post');
  const [tab, setTab] = useState('post');

  useEffect(() => {
    setTab(tabS);
  }, [tabS]);

  const handleClick = (tab: string) => {
    setTabS(tab);
  };
  return (
    <div style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)'}}>
      <div style={{borderBottom: tab === 'post' ? '4px solid #367B9D' : '1px solid #C0C0C0', transition: 'left 2.5s ease-out'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('post')} className={css({width: '100%', WebkitTapHighlightColor: 'transparent'})}>
            <span
              style={{color: tab === 'post' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginLeft: '10px',
                fontWeight: 'semibold',
              })}
            >
              投稿
            </span>
          </button>
        </div>
      </div>
      <div style={{borderBottom: tab === 'media' ? '4px solid #367B9D' : '1px solid #C0C0C0', transition: 'left 2.5s ease-out'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('media')} className={css({width: '100%', WebkitTapHighlightColor: 'transparent'})}>
            <span
              style={{color: tab === 'media' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              写真・動画
            </span>
          </button>
        </div>
      </div>
      <div style={{borderBottom: tab === 'reply' ? '4px solid #367B9D' : '1px solid #C0C0C0', transition: 'left 2.5s ease-out'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('reply')} className={css({width: '100%', WebkitTapHighlightColor: 'transparent'})}>
            <span
              style={{color: tab === 'reply' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              返信
            </span>
          </button>
        </div>
      </div>
      <div style={{borderBottom: tab === 'like' ? '4px solid #367B9D' : '1px solid #C0C0C0', transition: 'left 2.5s ease-out'}}>
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'center', pb: '0.37rem', pt: '0.7rem'})}>
          <button type="button" onClick={() => handleClick('like')} className={css({width: '100%', WebkitTapHighlightColor: 'transparent'})}>
            <span
              style={{color: tab === 'like' ? '#367b9d' : '#4A4A4A'}}
              className={css({
                fontSize: '0.97rem',
                marginRight: '10px',
                fontWeight: 'semibold',
              })}
            >
              いいね
            </span>
          </button>
        </div>
      </div>
      <div />
    </div>
  );
};

export default Tab;
