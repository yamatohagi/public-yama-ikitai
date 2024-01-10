import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import Image from 'next/image';
import {css} from 'styled-system/css';
import Link from 'next/link';
import {paths} from 'src/routes/paths';
import {Fragment, useState} from 'react';
import EdgeSwipeBlock from 'src/EdgeSwipeBlock';

type DetailImageType = {
  original: string;
  thumbnail: string;
  width: number;
  height: number;
  title: string | null;
  type: string;
  uploadStatus: string;
  PhotoLabel?: {
    labelTop: number | null;
    labelLeft: number | null;
    Mountain: {
      id: number;
      name: string;
    } | null;
  }[];
};
type PostImagesProps = {
  images?: DetailImageType[];
  initialSlideIdx?: number;
};

const PostImages: React.FC<PostImagesProps> = ({images, initialSlideIdx}: PostImagesProps) => {
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [imageIsReady, setImageIsReady] = useState(false);

  return (
    <EdgeSwipeBlock>
      <Splide hasTrack={false} aria-label="..." options={{arrows: false, start: Number(initialSlideIdx) || 0}} className={css({mt: 2})}>
        <ul className={`splide__pagination `} style={{top: '105%'}} />
        <SplideTrack>
          {images?.map((image, index) => {
            const paddingBottom = `${((image.height || 0) / (image.width || 0)) * 100}%`;

            return (
              <SplideSlide key={index} style={{width: '100%', aspectRatio: `${image.width}/${image.height}`}}>
                {/* videoと画像で分ける */}

                {image.type === 'VIDEO' ? (
                  <div>
                    {image.uploadStatus === 'uploaded' ? (
                      <>
                        <video
                          style={{
                            width: '100%',
                            backgroundColor: '#efefef',
                          }}
                          controls={false}
                          playsInline
                          preload="none"
                          autoPlay
                          muted
                          loop
                          src={image.original}
                          onLoadedData={() => {
                            setVideoIsReady(true);
                          }}
                        />
                        <Image
                          src={image.thumbnail}
                          alt={image.title || ''}
                          sizes="33vw" // ここはvideoが来るからいいや
                          fill
                          style={{
                            zIndex: 1,
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            backgroundColor: '#efefef',
                            objectFit: 'cover',
                            opacity: videoIsReady ? 0 : 1, // ビデオがロードされたら透過
                            transition: 'opacity 0.5s ease', // 透過のアニメーション
                          }}
                          loading="eager"
                        />
                      </>
                    ) : (
                      <div style={{width: '100%', paddingBottom, backgroundColor: '#efefef', objectFit: 'contain'}}>
                        <Image
                          src={image.thumbnail}
                          alt={image.title || ''}
                          fill
                          loading="eager"
                          sizes="33vw"
                          style={{zIndex: 1, opacity: imageIsReady ? 0 : 1}}
                        />
                        <Image
                          src={image.thumbnail}
                          alt={image.title || ''}
                          fill
                          loading="eager"
                          sizes="100vw"
                          style={{zIndex: 0}}
                          onLoadingComplete={() => {
                            setImageIsReady(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{width: '100%', paddingBottom, backgroundColor: '#efefef', objectFit: 'contain'}}>
                    <Image
                      loading="eager"
                      src={image.original}
                      alt={`Slide image ${index}`}
                      fill
                      style={{
                        objectFit: 'contain',
                        zIndex: 1,
                        opacity: imageIsReady ? 0 : 1,
                      }}
                      sizes="33vw"
                    />
                    <Image
                      loading="eager"
                      src={image.original}
                      alt={`Slide image ${index}`}
                      fill
                      style={{
                        objectFit: 'contain',
                        zIndex: 0,
                      }}
                      onLoadingComplete={() => {
                        setImageIsReady(true);
                      }}
                      sizes="100vw"
                    />
                  </div>
                )}
                {image.PhotoLabel && <MountainLabel labels={image.PhotoLabel} />}
              </SplideSlide>
            );
          })}
        </SplideTrack>
      </Splide>
    </EdgeSwipeBlock>
  );
};

export default PostImages;

const triangleStyle = css({
  content: "''",
  position: 'absolute',
  top: '100%',
  left: '50%',
  marginLeft: '-6px',
  borderWidth: '6px',
  borderStyle: 'solid',
  borderColor: 'rgba(255, 255, 255, 0.7) transparent transparent transparent', // borderColorを変更
});
type DetailImageLabelType = {
  labelTop: number | null;
  labelLeft: number | null;
  Mountain: {
    id: number;
    name: string;
  } | null;
};

const MountainLabel = ({labels}: {labels: DetailImageLabelType[]}) => (
  <>
    {labels.map(
      (mp, i) =>
        mp.labelTop && (
          <Fragment key={i}>
            <Link href={`${paths.mountain.index.path}/${mp.Mountain?.id}`}>
              <div
                style={{
                  position: 'absolute',
                  top: `${mp.labelTop}%`,
                  left: `${mp.labelLeft}%`,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  padding: '5px',
                  borderRadius: '5px',
                  zIndex: 100,
                }}
              >
                {mp.Mountain?.name}
                <div className={triangleStyle} />
              </div>
            </Link>
          </Fragment>
        )
    )}
  </>
);
