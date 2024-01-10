import Skeleton from '@mui/material/Skeleton';
import {css} from 'styled-system/css';

export default function DetailSkeleton() {
  return (
    <>
      {/* タイトルと場所 */}
      <div className={css({mt: 9})}>
        <Skeleton variant="text" width="50%" height="3.9rem" />
        <Skeleton variant="text" width="70%" height="1.8rem" />
        <Skeleton variant="text" width="100%" height="2.2rem" />
      </div>
      {/* 画像 */}
      <div>
        <Skeleton variant="rectangular" width="100%" height="20rem" />
      </div>
      <div className={css({display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 5})}>
        <Skeleton variant="text" width="80%" height="4.2rem" />
      </div>
      <div className={css({display: 'flex', justifyContent: 'center', alignItems: 'center'})}>
        <Skeleton variant="rounded" width="98%" height={500} />
      </div>
    </>
  );
}
