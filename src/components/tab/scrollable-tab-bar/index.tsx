import React, {CSSProperties, useEffect, useRef, useState} from 'react';
import Iconify from 'src/components/iconify/Iconify';
import {useGlobalState} from 'src/components/provider/useGlobalStore';
import {css} from 'styled-system/css';
import Tab from './c/tab';

type ScrollableTabBarProps = {
  initialTab: string;
  stateKey: string;
  tabs: string[];
};
export default function ScrollableTabBar({tabs, stateKey, initialTab}: ScrollableTabBarProps) {
  const [activeTab, setActiveTab] = useGlobalState(stateKey, initialTab);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [isEndOfScroll, setIsEndOfScroll] = useState(false);
  const [isStartOfScroll, setIsStartOfScroll] = useState(true);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = tabListRef.current;
      if (element) {
        const isEnd = element.scrollLeft + element.offsetWidth + 2 >= element.scrollWidth;

        setIsEndOfScroll(isEnd);
        setIsStartOfScroll(element.scrollLeft <= 0);
      }
    };

    const element = tabListRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    // スクロールできるか
    if (element) {
      // スクロールが必要ない（または不可能な）場合、trueを返す
      setCanScroll(element.scrollWidth > element.offsetWidth);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToFirstTab = () => {
    const element = tabListRef.current;
    if (element) {
      const scrollDuration = 500; // スクロールにかける時間(ms)
      const startTime = performance.now();

      const smoothScroll = (time: number) => {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / scrollDuration, 1); // 進行度を0から1の間で計算

        element.scrollLeft = (1 - progress) * element.scrollWidth - element.offsetWidth; // スクロール位置を進行度に基づいて設定

        if (progress < 1) {
          window.requestAnimationFrame(smoothScroll); // 進行度が1未満の場合、次のフレームで再帰呼び出し
        }
      };

      window.requestAnimationFrame(smoothScroll);
    }
  };

  const scrollToLastTab = () => {
    const element = tabListRef.current;
    if (element) {
      const scrollMax = element.scrollWidth;
      const scrollDuration = 500; // スクロールにかける時間(ms)
      const startTime = performance.now();

      const smoothScroll = (time: number) => {
        const elapsedTime = time - startTime;
        const progress = Math.min(elapsedTime / scrollDuration, 1); // 進行度を0から1の間で計算

        element.scrollLeft = progress * scrollMax; // スクロール位置を進行度に基づいて設定

        if (progress < 1) {
          window.requestAnimationFrame(smoothScroll); // 進行度が1未満の場合、次のフレームで再帰呼び出し
        }
      };

      window.requestAnimationFrame(smoothScroll);
    }
  };

  return (
    <div style={tabsContainerStyle}>
      <div className={tabRootStyle} ref={tabListRef}>
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} value={tab} activeTab={activeTab} onClick={setActiveTab} />
        ))}
      </div>
      <div style={borderStyle} />

      <div style={startScrollIconAndGradation(isStartOfScroll)}>
        <div style={startGradientOverlayStyle} />
        <button type="button" style={startIconStyle} onClick={scrollToFirstTab}>
          <Iconify icon="material-symbols:navigate-before" width="2.6rem" color="#367B9D" />
        </button>
      </div>
      {canScroll && (
        <div style={scrollNextIconAndGradation(isEndOfScroll)}>
          <div style={gradientOverlayStyle} />
          <button type="button" style={fixedIconStyle} onClick={scrollToLastTab}>
            <Iconify icon="material-symbols:navigate-next" width="2.6rem" color="#367B9D" />
          </button>
        </div>
      )}
    </div>
  );
}

const tabsContainerStyle: CSSProperties = {
  position: 'relative',
};

const startGradientOverlayStyle: CSSProperties = {
  position: 'absolute',
  left: -1,
  top: 0,
  bottom: 0,
  width: '4.8rem',
  background: 'linear-gradient(to left, rgba(255, 255, 255, 0), #fff)', // Modified gradient direction and color stops
  pointerEvents: 'none',
};

const startScrollIconAndGradation = (isStartOfScroll: boolean): CSSProperties => ({
  transition: 'opacity 0.3s, visibility 0.3s', // アニメーションを追加
  opacity: isStartOfScroll ? 0 : 1, // ボタンの透明度を設定
  visibility: isStartOfScroll ? 'hidden' : 'visible', // ボタンの表示/非表示を設定
});

const startIconStyle: CSSProperties = {
  position: 'absolute',
  left: 2,
  top: '0rem',
};

const gradientOverlayStyle: CSSProperties = {
  position: 'absolute',
  right: -0,
  top: 0,
  bottom: 0,
  width: '4.8rem',
  background: 'linear-gradient(to left, #fff, rgba(255, 255, 255, 0))',
  pointerEvents: 'none',
};

const fixedIconStyle: CSSProperties = {
  position: 'absolute',
  right: 2,
  top: '0rem',
};

const scrollNextIconAndGradation = (isEndOfScroll: boolean): CSSProperties => ({
  transition: 'opacity 0.3s, visibility 0.3s', // アニメーションを追加
  opacity: isEndOfScroll ? 0 : 1, // ボタンの透明度を設定
  visibility: isEndOfScroll ? 'hidden' : 'visible', // ボタンの表示/非表示を設定
});

const tabRootStyle = css({
  paddingLeft: 2,
  display: 'flex',
  overflowX: 'auto',
  paddingTop: '0.5rem',

  scrollbarWidth: 'none',
  // MsOverflowStyle: 'none',エラー出て消した2023/10/27
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const borderStyle: CSSProperties = {
  borderBottom: '0.3px solid #B7B7B7',
  position: 'absolute',
  width: '100%',
  bottom: 0,
  zIndex: -1,
};
