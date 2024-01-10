import {Grid} from '@mui/material';
import Image from 'next/image';
import {TrailheadGetReturnType} from 'src/sections/_trailhead/detail/api';
import {css} from 'styled-system/css';

type RoadBlockProps = {
  trailhead: TrailheadGetReturnType;
};
export default function RoadBlock({trailhead}: RoadBlockProps) {
  return (
    <>
      <Grid item xs={12} sm={12}>
        <div className={css({display: 'flex', mt: '2rem'})}>
          <div className={css({ml: '2rem'})}>
            <Image alt="accounting" unoptimized src="/assets/icons/ic_accounting.svg" width={24} height={20} />
          </div>
          <div className={css({ml: '0.5rem', fontSize: '1.1rem', color: 'red'})}>通行止め情報</div>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className={css({ml: '2.5rem', color: '#323232'})}>{trailhead.roadblockInfo}</div>
      </Grid>
    </>
  );
}
