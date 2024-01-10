import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import {Splide, SplideSlide, SplideTrack} from '@splidejs/react-splide';
import Image from 'next/image';
import {FC} from 'react';
import {css} from 'styled-system/css';
import EdgeSwipeBlock from 'src/EdgeSwipeBlock';
import {GetMtPhotos} from './api';

export const ImageSlideshow: FC = () => {
  const {data: images} = GetMtPhotos();

  return (
    <EdgeSwipeBlock>
      <Splide hasTrack={false} aria-label="..." options={{arrows: false}} className={css({mt: 2, mb: 5})}>
        <ul className={`splide__pagination `} style={{top: '102%'}} />

        <div className="custom-wrapper">
          <SplideTrack>
            {images?.map((image, index) => (
              <SplideSlide key={index}>
                {/* videoと画像で分ける */}
                {image.type === 'VIDEO' ? (
                  <video autoPlay muted loop playsInline src={image.original} />
                ) : (
                  <Image src={image.original} alt={`Slide image ${index}`} width={9000} height={10} style={{width: '100%', height: 'auto'}} />
                  // ここなぞheight
                )}
              </SplideSlide>
            ))}
          </SplideTrack>
        </div>
      </Splide>
    </EdgeSwipeBlock>
  );
};
