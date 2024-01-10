import {Link, Skeleton} from '@mui/material';
import NImage from 'next/image';
import NextLink from 'next/link';
import {paths} from 'src/routes/paths';
import type {MediaType} from '@prisma/client';
import {uploadStatusType} from 'generated/schema/zod/inputTypeSchemas/uploadStatusSchema';
import {memo, useEffect, useRef, useState} from 'react';
import Iconify from 'src/components/iconify';

export type Image = {
  initialSlideIdx?: number;
  id: number;
  original: string;
  thumbnail: string;
  width: number | null;
  height: number | null;
  title: string;
  type: MediaType;
  onClick?: (e: React.MouseEvent) => void; // 追加
  postId: number | null;
  uploadStatus: uploadStatusType;
};

type SquareImageGridProps = {
  photoItems: Image[];
  // 何列並べるか
  column?: number;
  // 画像と画像の間のスペース
  gap?: string;
  iMode?: boolean;
};

const GalleryImages = ({photoItems, column = 3, gap = '2px', iMode = false}: SquareImageGridProps) => {
  const iModeAry = generatePattern(photoItems.length);
  return (
    <div style={{display: 'grid', gridTemplateColumns: `repeat(${column}, 1fr)`, gap, border: '2px solid #FFF'}}>
      {photoItems?.map((item, index) => (
        <ImageItem key={index} image={item} index={index} column={column} gap={gap} spanRows={iMode ? iModeAry.includes(index) : false} />
      ))}
    </div>
  );
};

export default memo(GalleryImages);

const ImageItem = ({image, index, column, gap, spanRows}: {image: Image; index: number; column?: number; gap?: string; spanRows: boolean}) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoIsReady, setVideoIsReady] = useState(false);
  const videoContainerRef = useRef<any>(null);

  // サムネイルが読み込まれたらビデオをロードする
  useEffect(() => {
    if (!spanRows || image.uploadStatus !== 'uploaded') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ビューポートに入った時の処理
            const videoElement = document.createElement('video');
            videoElement.src = image.original;
            videoElement.addEventListener('loadeddata', () => {
              setIsVideoLoaded(true);
            });
            videoElement.load();
          } else {
            // ビューポートから外れた時の処理
            setVideoIsReady(false);
            // 1秒後setIsVideoLoaded(false);

            setIsVideoLoaded(false);
          }
        });
      },
      {threshold: 0.1}
    );

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [image.uploadStatus, image.original, spanRows]);

  const rowStyle = spanRows ? {gridRow: 'span 2'} : {};
  const squareContainerDynamicStyle = spanRows ? {paddingBottom: '200%'} : {};
  return (
    <div key={index} style={{...rowStyle, gridColumn: 'span 1'}}>
      <Link
        component={NextLink}
        href={`${paths.post.index.path}/${image.postId}?initialSlideIdx=${image.initialSlideIdx}
      `}
        color="inherit"
        underline="none"
        prefetch={false}
        shallow
      >
        <div style={{...squareContainerStyle, ...squareContainerDynamicStyle}} ref={videoContainerRef}>
          {image.type === 'VIDEO' ? (
            <>
              {image.uploadStatus === 'uploaded' ? (
                <>
                  <div style={{position: 'absolute', top: '5%', left: '5%', zIndex: 1}}>
                    <Iconify icon="ic:outline-video-library" color="#FFF" height="30px" width="30px" />
                  </div>
                  {spanRows ? (
                    <>
                      {isVideoLoaded && (
                        <video
                          controls={false}
                          playsInline
                          preload="none"
                          placeholder="blur"
                          poster={image.thumbnail}
                          autoPlay
                          muted
                          loop
                          style={{...squareStyle, zIndex: 0}}
                          src={image.original}
                          onLoadedData={() => {
                            setVideoIsReady(true);
                          }}
                        />
                      )}

                      <NImage
                        src={image.thumbnail}
                        alt={image.title || ''}
                        sizes="33vw"
                        fill
                        style={{...squareStyle, opacity: videoIsReady ? 0 : 1, zIndex: 1, transition: 'opacity 0.5s ease'}}
                        loading="eager"
                      />
                    </>
                  ) : (
                    <NImage src={image.thumbnail} alt={image.title || ''} sizes="33vw" fill style={squareStyle} loading="eager" />
                  )}
                </>
              ) : (
                <>
                  <div style={{position: 'absolute', top: '5%', left: '5%', zIndex: 10}}>
                    <Iconify icon="line-md:uploading-loop" color="#FFF" height="30px" width="30px" />
                  </div>
                  <NImage src={image.thumbnail} alt={image.title || ''} sizes="33vw" fill style={squareStyle} loading="eager" />
                </>
              )}
            </>
          ) : (
            <NImage src={image.thumbnail} alt={image.title || ''} sizes="33vw" fill style={squareStyle} loading="eager" />
          )}
        </div>
      </Link>
    </div>
  );
};

const squareContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100%',
  paddingBottom: '100%', // アスペクト比を維持
  overflow: 'hidden',
};

const squareStyle: React.CSSProperties = {
  cursor: 'pointer',
  objectFit: 'cover',
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: '#efefef',
};

type ImageSkeletonProps = {
  column?: number;
  gap?: string;
};

export const ImageSkeleton = ({column = 3, gap = '2px'}: ImageSkeletonProps) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${column}, 1fr)`, gap, border: '2px solid #FFF'}}>
    {Array.from({length: column * column * column}, (_, i) => (
      <div key={i} style={{gridColumn: 'span 1', width: '100%', position: 'relative'}}>
        <div style={{width: '100%', paddingBottom: '100%', position: 'relative'}}>
          <Skeleton variant="rectangular" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} />
        </div>
      </div>
    ))}
  </div>
);

function generatePattern(length: number): number[] {
  const result: number[] = [];
  let current = 2; // 最初の数
  let add = 3; // 増加する数（最初は3）

  for (let i = 0; i < length; i++) {
    result.push(current);
    current += add;
    add = add === 3 ? 7 : 3; // 3と7を交互に切り替える
  }

  return result;
}
