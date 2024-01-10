import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';

import Lists from 'src/sections/_trailhead/search/c/list';
import {GetTrailheadList} from './api';

type AroundTrailheadProps = {lat: number | null; lng: number | null};

const AroundTrailhead = ({lat, lng}: AroundTrailheadProps) => {
  const {posts, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = GetTrailheadList({lat, lng});

  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 0}}>
        <div className={css({marginLeft: '0.7rem', marginTop: '2rem'})}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span className={css({fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem'})}>近くの登山口</span>
        </div>
      </Grid>
      <Lists posts={posts} fetchNextPage={fetchNextPage} isLoading={isLoading} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage} />
    </>
  );
};

export default AroundTrailhead;
