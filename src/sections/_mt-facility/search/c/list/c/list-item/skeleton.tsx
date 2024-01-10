import Skeleton from '@mui/material/Skeleton';

import {css} from 'styled-system/css';

const ListItemSkeleton = () => (
  <div className={css({mb: 8, ml: 4, mt: 10})}>
    <Skeleton width="60%" height="40px" />
    <Skeleton width="60%" height="20px" />
    <Skeleton width="60%" height="20px" />
    <Skeleton width="60%" height="20px" />
  </div>
);

export default ListItemSkeleton;
