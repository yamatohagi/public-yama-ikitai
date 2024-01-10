import NextImage from 'next/image';
import { CSSProperties } from 'react';

type RatingProps = {
  title: string;
  ratingValue: number;
  style?: CSSProperties;
};

const Rating = ({ title, ratingValue, style }: RatingProps) => {
  const totalRating = 5;
  return (
    <div style={{ ...style }}>
      <span style={{ verticalAlign: 'middle' }}>
        {title} {'　'}：
      </span>
      {Array.from({ length: totalRating }).map((_, i) => (
        <NextImage
          key={i}
          src={
            i < ratingValue
              ? '/assets/icons/custom/mountain_active.svg'
              : '/assets/icons/custom/mountain_passive.svg'
          }
          alt="Icon"
          width={23}
          height={23}
          style={{ display: 'inline-block', marginLeft: i > 0 ? '0.4rem' : '0.5rem' }}
        />
      ))}
    </div>
  );
};

export default Rating;
