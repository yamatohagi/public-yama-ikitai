import React, {MouseEvent, useMemo, useRef} from 'react';
import EdgeSwipeBlock from 'src/EdgeSwipeBlock';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import Image from 'next/image';
import {css} from 'styled-system/css';
import {DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors} from '@dnd-kit/core';
import {useAtom} from 'jotai';
import Modal from '../../../../../Modal';
import MtSelectModalInner from './c/mt-select-modal-inner';
import {useMtSelectModal} from './c/mt-select-modal-inner/modalState';
import {DraggableLabel} from './c/draggable-label';
import {ImagesAndLabelAtom} from '../../state';

export function LabelSelect({urls}: {urls: string[]}) {
  const [images, setImages] = useAtom(ImagesAndLabelAtom);
  const {openModal, isOpen, closeModal, modalProps} = useMtSelectModal();
  const imageItemRefs = useRef<{[key in number]: HTMLImageElement}>({});

  const convertedImages = useMemo(
    () =>
      images.map((image, idx) => ({
        id: idx,
        refCallbackFunction: (node: HTMLImageElement | null) => {
          if (node) {
            imageItemRefs.current[idx] = node;
          } else {
            delete imageItemRefs.current[idx];
          }
        },
      })),
    [images]
  );

  const sensors = useSensors(
    useSensor(MouseSensor, {activationConstraint: {distance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {distance: 5}})
  );

  const handleImageClick = (event: MouseEvent<HTMLImageElement>, url: string, imageIdx: number) => {
    // クリックされた位置を取得
    const {offsetX, offsetY} = event.nativeEvent;

    // 画像要素のサイズを取得
    const imageElement = event.currentTarget;
    const width = imageElement.clientWidth;
    const height = imageElement.clientHeight;

    // パーセンテージ座標を計算
    const xPercent = (offsetX / width) * 100;
    const yPercent = (offsetY / height) * 100;

    const newLabel = {x: xPercent, y: yPercent, text: '未設定', url, index: images[imageIdx]?.labels?.length || 0, mtId: null};
    const labelIdx = newLabel.index;

    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[imageIdx] = {...newImages[imageIdx], labels: [...(newImages[imageIdx]?.labels || []), newLabel]};
      return newImages;
    });

    openModal({
      labelUpdate: ({mtId, newLabelText}) => {
        setImages((prevImages) => {
          const newImages = [...prevImages];
          newImages[imageIdx] = {
            ...newImages[imageIdx],
            labels: newImages[imageIdx]?.labels?.map((label) => {
              if (label.index !== labelIdx) return label;
              return {...label, text: newLabelText, mtId};
            }),
          };
          return newImages;
        });
      },
    });
  };

  const closeMtSelectModal = () => {
    // 未設定のラベルを削除
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.forEach((image) => {
        image?.labels?.forEach((label, index) => {
          if (label.text === '未設定') {
            image.labels?.splice(index, 1);
          }
        });
      });
      return newImages;
    });
    closeModal();
  };

  const handleDragEnd = (e: DragEndEvent) => {
    // ドラッグが終了した要素のIDを取得
    const imageIdx = e.active.data.current?.imageIdx;
    const labelIdx = e.active.data.current?.labelIdx;

    // ラベルの新しい位置を取得
    const {x, y} = e.delta;

    // 画像要素のサイズを取得
    const imageRef = imageItemRefs.current[imageIdx];
    const width = imageRef.clientWidth;
    const height = imageRef.clientHeight;

    // パーセンテージ座標を計算
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[imageIdx] = {
        ...newImages[imageIdx],

        labels: newImages[imageIdx]?.labels?.map((label) => {
          if (label.index !== labelIdx) return label;

          const newXPercent = label.x + (x / width) * 100;
          const newYPercent = label.y + (y / height) * 100;

          console.log({width, height});
          console.log({x, y});
          console.log({newXPercent, newYPercent});

          // 100%を超えていたら0 or 100にする
          if (newXPercent > 100 || newXPercent < 0 || newYPercent > 100 || newYPercent < 0) return label;
          return {...label, x: newXPercent, y: newYPercent};
        }),
      };
      return newImages;
    });
  };

  // labelがクリックされた時消したい
  const handleLabelDelete = ({imageIdx, labelIdx}: {imageIdx: number; labelIdx: number}) => {
    setImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[imageIdx] = {
        ...newImages[imageIdx],
        labels: newImages[imageIdx]?.labels?.filter((label) => label.index !== labelIdx),
      };
      return newImages;
    });
  };

  return (
    <>
      {/* 山をセレクトするモーダル */}
      <Modal open={isOpen} onClose={closeMtSelectModal} dialogProps={{fullWidth: false}} width="100%">
        {isOpen && <MtSelectModalInner closeModal={closeMtSelectModal} modalProps={modalProps} />}
      </Modal>

      <EdgeSwipeBlock>
        <Splide
          hasTrack={false}
          aria-label="..."
          options={{arrows: false, noDrag: '.label-style', lazyLoad: 'nearby'}}
          className={css({mt: 2, mb: 5})}
        >
          <ul className={`splide__pagination `} style={{top: '102%'}} />

          <div className="custom-wrapper">
            <SplideTrack>
              {convertedImages?.map((v, idx) => (
                <SplideSlide key={idx}>
                  <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
                    <div style={{position: 'relative'}}>
                      {false ? (
                        <video autoPlay muted loop playsInline src={images[idx].previewUrl} />
                      ) : (
                        <Image
                          ref={v.refCallbackFunction}
                          src={images[idx].previewUrl}
                          alt={`Slide image ${idx}`}
                          width={9000}
                          height={10}
                          style={{width: '100%', height: 'auto'}}
                          onClick={(e) => handleImageClick(e, images[idx].previewUrl, idx)}
                        />
                      )}
                      {images[idx]?.labels?.map((label, index) => (
                        <DraggableLabel
                          key={index}
                          identifier={{imageIdx: idx, labelIdx: index}}
                          label={label}
                          handleLabelDelete={handleLabelDelete}
                        />
                      ))}
                    </div>
                  </DndContext>
                </SplideSlide>
              ))}
            </SplideTrack>
          </div>
        </Splide>
      </EdgeSwipeBlock>
    </>
  );
}
