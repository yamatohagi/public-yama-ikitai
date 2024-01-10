import {Fragment} from 'react';
import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';
import ParkingItem from './c/list-item';
import {TrailheadGetReturnType} from '../../api';

type Parking = TrailheadGetReturnType['Parking'][number];
type ParkingListProps = {
  parkings: Parking[];
};

export default function ParkingList({parkings}: ParkingListProps) {
  return (
    <>
      {/* 大項目 */}
      <Grid item xs={12} sm={12} sx={{mt: 4}}>
        <div className={css({marginLeft: '0.2rem', mb: 4})}>
          <TitleStartIcon sx={{ml: 1.5}} />
          <span className={css({fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem'})}>駐車場</span>
        </div>
      </Grid>
      {/* 駐車場 */}
      {parkings.map((parking, index) => (
        <Fragment key={index}>
          <ParkingItem parkings={parkings} parking={parking} />
        </Fragment>
      ))}
    </>
  );
}
