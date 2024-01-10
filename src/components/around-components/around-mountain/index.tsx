import {Fragment} from 'react';
import MountainListItem from 'src/components/feature/mountain/MountainListItem';
import {Grid, Skeleton} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';
import {GetMountainList} from './api';

type AroundMountainProps = {lat: number | null; lng: number | null};

const AroundMountain = ({lat, lng}: AroundMountainProps) => {
  const {mountains} = GetMountainList({lat, lng});

  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 4}}>
        <div className={css({marginLeft: '0.7rem', mb: 3})}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span className={css({fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem'})}>周辺の山</span>
        </div>
      </Grid>
      {mountains
        ? mountains.map((m, i) => (
            <Fragment key={i}>
              <MountainListItem mountain={m} />
            </Fragment>
          ))
        : [...Array(12)].map((m, i) => (
            <Fragment key={i}>
              <Skeleton width="40%" height="2.3rem" />
              <Skeleton width="85%" height="1.5rem" />
              <Skeleton width="43%" height="11rem" />
              <Skeleton width="30%" height="2rem" />
              <Skeleton width="30%" height="2rem" />
              <Skeleton width="30%" height="2rem" />
            </Fragment>
          ))}
    </>
  );
};

export default AroundMountain;
