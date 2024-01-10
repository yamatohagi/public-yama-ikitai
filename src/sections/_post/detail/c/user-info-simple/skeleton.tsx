import Skeleton from '@mui/material/Skeleton';
import {css} from 'styled-system/css';

const UserInfoSimpleSkeleton = () => (
  <>
    {/* 画像をiconサイズで置いてそれ以外の横のスペースを名前にする */}
    <div className={css({display: 'flex'})}>
      {/* スケルトンIcon */}
      <Skeleton width="40px" height="60px" style={{borderRadius: '50%'}} />
    </div>
  </>
);

export default UserInfoSimpleSkeleton;
