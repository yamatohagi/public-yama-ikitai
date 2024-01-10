import {Fragment} from 'react';
import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import MtTrailHeadItem from './c/mt-trailhead/itam';
import MtThRatingPostModal from './c/mt-trailhead/MtThRatingPostModal';
import {GetTrailheads} from './api';

export default function MtTrailHead() {
  const {data: mtTrailHeads} = GetTrailheads();
  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 2}}>
        <div style={{marginLeft: '0.2rem', marginBottom: '1.5rem'}}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span
            style={{
              color: '#323232',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginLeft: '0.5rem',
            }}
          >
            登山口
          </span>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <MtThRatingPostModal />
        {mtTrailHeads ? (
          mtTrailHeads?.map((mtTrailHead, i) => (
            <Fragment key={i}>
              <MtTrailHeadItem mtTrailHead={mtTrailHead} i={i} />
            </Fragment>
          ))
        ) : (
          <>ロード中</>
        )}
      </Grid>
    </>
  );
}
