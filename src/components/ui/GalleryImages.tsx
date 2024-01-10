import {Link, Skeleton} from '@mui/material';
import NImage from 'next/image';
import NextLink from 'next/link';
import {paths} from 'src/routes/paths';
import {MediaType} from '@prisma/client';
import {css} from 'styled-system/css';
import {useState} from 'react';

export type Image = {
  original: string;
  thumbnail: string;

  title: string;
  type: MediaType;
  onClick?: (e: React.MouseEvent) => void; // 追加
  postId: number | null;
};

type SquareImageGridProps = {
  photoItems: Image[] | undefined;
  // 何列並べるか
  column?: number;
  // 画像と画像の間のスペース
  gap?: string;
  row?: number;
};
const GalleryImages = ({photoItems, column = 3, gap = '2px', row = 9}: SquareImageGridProps) => {
  const [loading, setLoading] = useState<number[]>([]);
  if (!photoItems) return <ImageSkeleton column={column} gap={gap} row={row} />;

  return (
    <div className={css({display: 'grid', gridTemplateColumns: `repeat(${column}, 1fr)`, gap, border: '2px solid #FFF'})}>
      {photoItems.map((item, index) => (
        <Link key={index} component={NextLink} href={`${paths.post.index.path}/${item.postId}`} color="inherit" underline="none">
          <div style={squareContainerStyle}>
            {item.type === 'VIDEO' ? (
              <>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={squareStyle}
                  src={item.thumbnail}
                  onLoadedData={() => setLoading([...loading, index])}
                />
                {!loading.includes(index) && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundImage: 'url("/assets/images/loading/loading_move.svg")',
                      backgroundPosition: 'center',
                      backgroundSize: 'contain',
                    }}
                  />
                )}
              </>
            ) : (
              <NImage src={item.original} alt={item.title || ''} fill sizes="33.3vw" style={squareStyle} />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default GalleryImages;

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
};

type ImageSkeletonProps = {
  column?: number;
  gap?: string;
  row?: number;
};

export const ImageSkeleton = ({column = 3, gap = '2px', row = 9}: ImageSkeletonProps) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${column}, 1fr)`, gap, border: '2px solid #FFF'}}>
    {Array.from({length: row * column}, (_, i) => (
      <div key={i} style={{gridColumn: 'span 1', width: '100%', position: 'relative'}}>
        <div style={{width: '100%', paddingBottom: '100%', position: 'relative'}}>
          <Skeleton variant="rectangular" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} />
        </div>
      </div>
    ))}
  </div>
);
