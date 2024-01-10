import {Grid} from '@mui/material';
import convertLines from 'src/components/feature/ConvertLines';
import Iconify from 'src/components/iconify/Iconify';
import DynamicTable from 'src/components/ui/DynamicTable';
import {tfStr} from 'src/functions/tfStr';
import {TrailheadGetReturnType} from 'src/sections/_trailhead/detail/api';
import {css} from 'styled-system/css';

type Parking = TrailheadGetReturnType['Parking'][number];
type ParkingItemProps = {
  parkings: Parking[];
  parking: Parking;
};
export default function ParkingItem({parkings, parking}: ParkingItemProps) {
  return (
    <>
      {/* 名前とマップを開くの一行 */}
      <Grid item xs={12} sm={12}>
        <div className={css({mx: 4})}>
          <div className={css({display: 'flex', justifyContent: 'space-between'})}>
            <div>{parking.name}</div>
            <div>マップを開く</div>
          </div>
        </div>
      </Grid>
      {/* 表 */}
      <Grid item xs={12} sm={12}>
        <div className={css({mx: 4})}>
          <DynamicTable
            data={[
              [
                {
                  key: (
                    <div className={css({display: 'flex'})}>
                      <Iconify icon="ph:timer-bold" width="7%" sx={{mr: 0.3}} />
                      登山口まで(時間)
                    </div>
                  ),

                  value: (
                    <div className={css({color: isSmallest(parkings, 'timeToTrailhead', parking.timeToTrailhead) ? '#FF0000' : ''})}>
                      {parking.timeToTrailhead}分
                    </div>
                  ),
                },
                {
                  key: (
                    <div className={css({display: 'flex'})}>
                      <Iconify icon="ri:pin-distance-fill" width="7%" sx={{mr: 0.3}} />
                      登山口まで(距離)
                    </div>
                  ),
                  value: (
                    <div className={css({color: isSmallest(parkings, 'timeToTrailhead', parking.distanceToTrailhead) ? '#FF0000' : ''})}>
                      {parking.distanceToTrailhead}m
                    </div>
                  ),
                },
                {
                  key: (
                    <div className={css({display: 'flex'})}>
                      <Iconify icon="fluent-mdl2:parking-location" width="7%" sx={{mr: 0.3}} />
                      台数
                    </div>
                  ),
                  value: <>{parking.capacity ? `${parking.capacity}台` : '-'}</>,
                },
                {
                  key: (
                    <div className={css({display: 'flex'})}>
                      <Iconify icon="healthicons:un-paved-road" width="7%" sx={{mr: 0.3}} />
                      ダート道
                    </div>
                  ),
                  value: <>{tfStr(parking.dirtRoad)}</>,
                },
                {
                  key: (
                    <div className={css({display: 'flex'})}>
                      <Iconify
                        icon="streamline:money-currency-yuan-circle-exchange-payment-forex-finance-yuan-currency-money-foreign"
                        width="7%"
                        sx={{mr: 0.3}}
                      />
                      料金
                    </div>
                  ),
                  value: <>{parking.feeStr ? `${parking.feeStr}` : '-'}</>,
                },
              ],
            ]}
          />
        </div>
      </Grid>
      {/* 山ノート */}
      <Grid item xs={12} sm={12}>
        {parking.notes && (
          <div className={css({backgroundColor: '#EDEDED', borderRadius: '0.5rem'})}>
            <div className={css({p: '0.7rem'})}>
              <div
                className={css({
                  display: 'flex',
                  alignItems: 'center',
                  color: '#636363',
                })}
              >
                <Iconify icon="ci:note-edit" width={24} />
                <span className={css({ml: '0.3rem', fontWeight: '700'})}> 山ノート</span>
              </div>
              <div className={css({fontSize: '0.9rem', mt: '0.5rem', color: '#323232'})}> {convertLines(parking.notes)}</div>
            </div>
          </div>
        )}
      </Grid>
    </>
  );
}

const isSmallest = (arr: Parking[], key: keyof Parking, value: string | number | null) =>
  arr.every((item) => {
    if (item == null || value == null) return false;
    const itemValue = item[key];
    if (itemValue == null) return false;
    if (typeof itemValue !== typeof value) return false;
    return itemValue >= value;
  });
