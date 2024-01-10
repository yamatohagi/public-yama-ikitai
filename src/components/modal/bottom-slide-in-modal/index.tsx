import React, {useEffect, useRef, useState} from 'react';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {css} from 'styled-system/css';
import Modal from '@mui/material/Modal';
import Slide from '@mui/material/Slide';
import {useModalState} from 'src/components/provider/modalStateStore';
import SwipeBar from './components/SwipeBar';
import SplitBar from './components/SplitBar';

type BottomSlideInModalProps = {
  modalOpenStateKey: string;
  topComponent?: React.ReactNode;
  mainComponent?: React.ReactNode;
  bottomComponent?: React.ReactNode;
};

const BottomSlideInModal: React.FC<BottomSlideInModalProps> = ({modalOpenStateKey, topComponent, mainComponent, bottomComponent}) => {
  const {closeModal, modals} = useModalState();
  const isOpen = modals[modalOpenStateKey] || false;
  const handleClose = () => closeModal(modalOpenStateKey);

  // 各種hooksの初期化
  const [translateY, setTranslateY] = useState(0);
  const modalRef = useRef(null);
  const startY = useRef(0);
  const crossedZero = useRef(false);
  const startScrollTop = useRef(0);
  const lastUpdateY = useRef(0);

  useEffect(() => {
    if (isOpen) {
      // モーダルが開かれたときの初期化処理
      setTranslateY(0);
      startY.current = 0;
      crossedZero.current = false;
      startScrollTop.current = 0;
    }
  }, [isOpen]);

  const updatePosition = (diffY: number) => {
    if (Math.abs(diffY - lastUpdateY.current) > 2) {
      // 5は閾値として設定。適切な値に調整してください。

      setTranslateY(diffY);
      lastUpdateY.current = diffY;
    }
  };

  const touchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const diffY = e.touches[0].clientY - startY.current;
    requestAnimationFrame(() => updatePosition(diffY));
  };

  const touchEnd = async (e: React.TouchEvent<HTMLDivElement>) => {
    await new Promise((resolve) => setTimeout(resolve, 10));

    if (translateY > 100) {
      handleClose();
    } else {
      setTranslateY(0);
    }
  };

  // モーダルのスタイルを動的に変更するためのスタイル
  const modalStyle = {
    transform: `translateY(${translateY}px)`,
  };

  // タッチ開始時の共通処理
  const touchStartCommon = (e: React.TouchEvent<HTMLDivElement>) => {
    startY.current = e.touches[0].clientY;
  };

  // タッチ開始時の処理（スクロール対応）
  const touchStartWithScroll = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartCommon(e);
    startScrollTop.current = e.currentTarget.scrollTop;
    crossedZero.current = false;
  };

  // タッチ移動時の処理（スクロール対応）
  const touchMoveWithScroll = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!(e.touches && e.touches.length > 0)) return;

    const target = e.currentTarget;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - startY.current;

    // スクロール位置が0を跨いだかどうかを判断
    if ((startScrollTop.current > 0 && target.scrollTop <= 0) || (startScrollTop.current <= 0 && target.scrollTop > 0)) {
      crossedZero.current = true;
    }
    // スクロール位置が0以下で、0を跨いでいない、かつ下にスクロールしようとした場合
    if (!crossedZero.current && diffY > 5 && target.scrollTop <= 0) requestAnimationFrame(() => updatePosition(diffY));
  };

  // タッチ終了時の処理（スクロール対応）
  const touchEndWithScroll = async (e: React.TouchEvent<HTMLDivElement>) => {
    await new Promise((resolve) => setTimeout(resolve, 10));

    if (translateY > 100) {
      handleClose();
    } else {
      setTranslateY(0);
    }
  };

  // ここmodalでスクロール禁止にしている、別ページにするかなぁ、、
  useEffect(() => {
    if (globalThis?.document) {
      const {body} = globalThis.document;

      const updateBodyStyle = () => {
        const shouldPreventScroll = body.style.overflow === 'hidden';
        body.style.touchAction = shouldPreventScroll ? 'none' : '';
        body.style.position = shouldPreventScroll ? 'fixed' : '';
      };

      // 初回実行
      updateBodyStyle();

      // DOM変更を監視
      const observer = new MutationObserver(updateBodyStyle);

      observer.observe(body, {
        attributes: true,
        attributeFilter: ['style'],
      });

      // クリーンアップ関数
      return () => observer.disconnect();
    }
    return undefined;
  }, []);

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Slide direction="up" in={isOpen}>
        <div ref={modalRef} className={baseStyle} style={modalStyle}>
          <div onTouchStart={touchStartCommon} onTouchMove={touchMove} onTouchEnd={touchEnd}>
            <button type="button" onClick={handleClose} style={{width: '100%'}}>
              <SwipeBar />
              {topComponent}
              <SplitBar />
            </button>
          </div>
          <div
            style={{overflowY: 'auto', height: '100%'}}
            onTouchStart={touchStartWithScroll}
            onTouchMove={touchMoveWithScroll}
            onTouchEnd={touchEndWithScroll}
          >
            {mainComponent}
          </div>
          {bottomComponent}
        </div>
      </Slide>
    </Modal>
  );
};

export default BottomSlideInModal;

const baseStyle = css({
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '70%',
  bgColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  borderTopLeftRadius: '16px',
  borderTopRightRadius: '16px',
});
