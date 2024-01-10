import React, {useState, useEffect, useRef, Fragment} from 'react';
import {css} from 'styled-system/css';

type ExpandableContainerProps = {
  maxHeightInRem: number;
  children: React.ReactNode;
};

const ExpandableContainer = ({maxHeightInRem, children}: ExpandableContainerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const getRootElementFontSize = () => {
      const fontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
      return parseFloat(fontSize);
    };

    const baseFontSize = getRootElementFontSize();
    const maxHeightInPx = maxHeightInRem * baseFontSize;

    if (containerRef.current && containerRef.current.scrollHeight > maxHeightInPx) {
      setShouldShowButton(true);
    } else {
      setShouldShowButton(false);
    }
  }, [children, maxHeightInRem]);

  return (
    <>
      <div
        ref={containerRef}
        className={css({
          minWidth: '100%',
          mt: '0.1rem',
          maxHeight: isExpanded ? 'none' : '7rem', // 3rem is the initial max height
          overflow: 'hidden',
          position: 'relative', // <-- 追加: relative positioning for gradient overlay
        })}
      >
        {children}
        {!isExpanded &&
          shouldShowButton && ( // <-- 追加: グラデーションの条件
            <div
              className={css({
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '3.5rem', // <-- グラデーションの高さを調整
                backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))',
              })}
            />
          )}
      </div>
      {shouldShowButton && (
        <div className={css({display: 'flex', justifyContent: 'center'})}>
          <button
            style={{
              marginTop: isExpanded ? '1.3rem' : 0,
              ...(isExpanded && {
                border: '2.5px solid #367B9D',
                borderRadius: '6px',
                paddingLeft: '0.4rem',
                paddingRight: '0.4rem',
              }),
            }}
            className={css({color: '#367B9D', fontWeight: 'semibold', fontSize: '0.8rem'})}
            type="button"
            onClick={toggleExpanded}
          >
            {isExpanded ? '閉じる' : 'もっと見る'}
          </button>
        </div>
      )}
    </>
  );
};

export default ExpandableContainer;
