import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';
import Lists from 'src/sections/_mt-facility/search/c/list';
import {GetMtFacilityList} from './api';

type AroundMtFacilityProps = {lat: number | null; lng: number | null};

const AroundMtFacility = ({lat, lng}: AroundMtFacilityProps) => {
  const {posts, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage} = GetMtFacilityList({lat, lng});

  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 4}}>
        <div className={css({marginLeft: '0.7rem'})}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span className={css({fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem'})}>周辺の山小屋</span>
        </div>
      </Grid>
      <Lists posts={posts} fetchNextPage={fetchNextPage} isLoading={isLoading} hasNextPage={!!hasNextPage} isFetchingNextPage={isFetchingNextPage} />
    </>
  );
};

export default AroundMtFacility;
