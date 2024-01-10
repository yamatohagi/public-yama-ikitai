import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import Image from 'next/image';
import {Prisma} from '@prisma/client';
import {css} from 'styled-system/css';
import {useEffect, useRef, useState} from 'react';

type PostImagesProps = {
  images?: Prisma.PhotoGetPayload<{}>[];
};

const PostImages: React.FC<PostImagesProps> = ({images}: PostImagesProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoIsReady, setVideoIsReady] = useState(false);
  const videoContainerRef = useRef<any>(null);

  // サムネイルが読み込まれたらビデオをロードする
  useEffect(() => {
    if (!images?.[0]) return;
    if (images?.[0].uploadStatus !== 'uploaded') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // ビューポートに入った時の処理
            const videoElement = document.createElement('video');
            videoElement.src = images[0].original;
            videoElement.addEventListener('loadeddata', () => {
              setIsVideoLoaded(true);
            });
            videoElement.load();
          } else {
            // ビューポートから外れた時の処理
            setVideoIsReady(false);
            // 1秒後setIsVideoLoaded(false);をつけたら0.9でもいい感じに切り替わる
            setIsVideoLoaded(false);
          }
        });
      },
      {threshold: 0.1}
    ); // 50%の要素が見えたらトリガー

    if (videoContainerRef.current) {
      observer.observe(videoContainerRef.current);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      if (videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, [images]);

  return (
    <Splide hasTrack={false} aria-label="..." options={{arrows: false}} className={css({mt: 2, mb: 3})}>
      <ul className={`splide__pagination `} style={{top: '102%'}} />

      <div className="custom-wrapper" ref={videoContainerRef}>
        <SplideTrack>
          {images?.map((image, index) => {
            return (
              <SplideSlide key={index} style={{width: '100%', maxHeight: '450px', aspectRatio: `${image.width}/${image.height}`}}>
                {/* videoと画像で分ける */}
                {image.type === 'VIDEO' ? (
                  <>
                    {image.uploadStatus === 'uploaded' ? (
                      <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        {isVideoLoaded && (
                          <video
                            controls={false}
                            playsInline
                            preload="none"
                            autoPlay
                            muted
                            loop
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundColor: '#efefef',
                              objectFit: 'cover',
                              zIndex: 0,
                            }}
                            src={image.original}
                            onLoadedData={() => {
                              setVideoIsReady(true);
                            }}
                          />
                        )}
                        <Image
                          src={image.thumbnail}
                          alt={image.title || ''}
                          sizes="33vw"
                          fill
                          style={{
                            zIndex: 1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: '#efefef',
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            opacity: videoIsReady ? 0 : 1, // ビデオがロードされたら透過
                            transition: 'opacity 0.5s ease', // 透過のアニメーション
                          }}
                          loading="eager"
                        />
                      </div>
                    ) : (
                      <>
                        <div style={{position: 'absolute', top: '5%', left: '5%', zIndex: 10}}>ビデオ(UP中)</div>
                        <Image
                          src={image.thumbnail}
                          alt={image.title || ''}
                          sizes="33vw"
                          fill
                          style={{
                            backgroundColor: '#efefef',
                            objectFit: 'cover',
                          }}
                          loading="eager"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <Image
                    src={image.original}
                    alt={`Slide image ${index}`}
                    fill
                    style={{
                      backgroundColor: '#efefef',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </SplideSlide>
            );
          })}
        </SplideTrack>
      </div>
    </Splide>
  );
};

export default PostImages;
