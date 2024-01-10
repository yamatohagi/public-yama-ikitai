import NextImage from 'next/image';
import {CSSProperties, memo} from 'react';

type RatingCustomProps = {
  ratingValue?: number | null;
  activeIconPath: string;
  passiveIconPath: string;
  style?: CSSProperties;
  totalRating?: number;
  size?: number;
};

const RatingCustom = ({ratingValue = 1, activeIconPath, passiveIconPath, style, totalRating = 5, size = 27}: RatingCustomProps) => (
  <div style={{...style}}>
    {Array.from({length: totalRating}).map((_, i) => (
      <NextImage
        unoptimized
        key={i}
        src={i < (ratingValue || 0) ? activeIconPath ?? '/assets/icons/custom/active.svg' : passiveIconPath ?? '/assets/icons/custom/passive.svg'}
        alt="Icon"
        width={size}
        height={size}
        style={{display: 'inline-block', marginLeft: i > 0 ? '0.4rem' : '0.5rem'}}
      />
    ))}
  </div>
);

export default memo(RatingCustom);
