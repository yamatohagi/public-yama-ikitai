import {Grid, Link} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';
import {phoneNumberAddHyphen} from 'src/functions/phone-number-format';
import DynamicTable from 'src/components/ui/DynamicTable';
import {tfStr} from 'src/functions/tfStr';
import {formatDateJp} from 'server/functions/etc';
import {paths} from 'src/routes/paths';
import NextLink from 'next/link';
import {InfoSplitDividerItem} from './c/InfoSplitDividerItem';
import {MtFacilityDetailGet} from '../../api';

const BasicInfo = ({mtFacility, refetch}: {mtFacility: NonNullable<ReturnType<typeof MtFacilityDetailGet>['mtFacility']>; refetch: VoidFunction}) => {
  return (
    <>
      <Grid item xs={12} sm={12} sx={{mt: 4}}>
        <div style={{marginLeft: '0.7rem', display: 'flex', alignItems: 'center'}}>
          <div>
            <TitleStartIcon sx={{ml: 0.2}} />
            <span
              style={{
                fontWeight: 'bold',
                fontSize: '1.1rem',
                marginLeft: '0.5rem',
              }}
            >
              基本情報
            </span>
          </div>
        </div>
      </Grid>
      <InfoSplitDividerItem
        data={[
          {
            key: '施設名',
            value: (
              <>
                {mtFacility.name}（{mtFacility.nameKana}）
              </>
            ),
          },
          {
            key: '営業期間',
            value: (() => {
              const currentYear = new Date().getFullYear();
              const currentBusinessPeriod = mtFacility.BusinessPeriod.find((v) => v.year === currentYear.toString());

              if (!currentBusinessPeriod) return '';
              return (
                <>
                  {formatDateJp(currentBusinessPeriod.start)}〜{formatDateJp(currentBusinessPeriod.end)}
                  {mtFacility.listTimeRemark && `（${mtFacility.listTimeRemark}）`}
                </>
              );
            })(),
          },
          {
            key: '収容人数',
            value: (
              <>
                <div>宿泊 {mtFacility.listCapacityHut && `${mtFacility.listCapacityHut}人`}</div>
                <div>テント {mtFacility.listCapacityTent && `${mtFacility.listCapacityTent}張`}</div>
              </>
            ),
          },
          {
            key: '料金',
            value: (
              <div>
                <div className={css({display: 'flex'})}>
                  <div className={css({flex: 5})}>
                    <span className={css({marginLeft: '0rem'})}>【宿泊】</span>
                  </div>
                  <div className={css({flex: 6})}>1泊2食</div>
                  <div className={css({flex: 4, textAlign: 'right', marginRight: '2rem'})}>
                    {mtFacility.listFeeHut && `${mtFacility.listFeeHut.toLocaleString()}円`}
                  </div>
                </div>
                <div className={css({display: 'flex'})}>
                  <div className={css({flex: 5})} />
                  <div className={css({flex: 6})}>素泊まり</div>
                  <div className={css({flex: 4, textAlign: 'right', marginRight: '2rem'})}>
                    {mtFacility.listFeeHut2 && `${mtFacility.listFeeHut2.toLocaleString()}円`}
                  </div>
                </div>
                <div className={css({display: 'flex', mt: '0.5rem'})}>
                  <div className={css({flex: 5})}>
                    <span className={css({marginLeft: '0rem'})}>【テント】</span>
                  </div>
                  <div className={css({flex: 3})} />
                  <div className={css({flex: 4, textAlign: 'right', marginRight: '2rem'})}>
                    {mtFacility.listFeeTent && `${mtFacility.listFeeTent.toLocaleString()}円`}
                  </div>
                </div>
              </div>
            ),
          },
          {
            key: 'TEL',
            value: (
              <div>
                <div className={css({display: 'flex'})}>
                  <div className={css({flex: 8})}>
                    <span className={css({ml: '0.5rem'})}>{phoneNumberAddHyphen(mtFacility.listTelOffice)}</span>
                  </div>
                  <div className={css({flex: 6})}>(事務所)</div>
                </div>
                <div className={css({display: 'flex'})}>
                  <div className={css({flex: 8})}>
                    <span className={css({ml: '0.5rem'})}>{phoneNumberAddHyphen(mtFacility.listTelLocal)}</span>
                  </div>
                  <div className={css({flex: 6})}>(現地電話)</div>
                </div>
              </div>
            ),
          },
          {
            key: 'HP',
            value: (
              <a href={`${mtFacility.listHp}`} target="_blank" rel="noopener noreferrer" className={css({textDecoration: 'underline'})}>
                {mtFacility.listHp}
              </a>
            ),
          },
          {
            key: '予約方法',
            value: (
              <>
                {mtFacility.MtFacilityToRsvMethod?.map((access, idx) => (
                  <div key={idx}>
                    <span>{access.RsvMethod.name}</span>
                  </div>
                ))}
              </>
            ),
          },
          {
            key: 'アクセス(登山口から)',
            value: (
              <>
                {mtFacility.TrailheadToMtFacility?.map((thToFcy, i) => {
                  return (
                    <div key={i}>
                      <Link
                        component={NextLink}
                        href={`${paths.trailhead.index.path}/${thToFcy.trailheadId}`}
                        target="_blank"
                        sx={{color: 'black', width: '200px', textDecoration: 'underline', '&:hover': {textDecoration: 'underline'}}}
                      >
                        {thToFcy.Trailhead.name}
                      </Link>
                      から{thToFcy.timeTo}分{/* <div>（{access.remark}）</div> */}
                    </div>
                  );
                })}
              </>
            ),
          },
          {
            key: 'アクセス(山頂まで)',
            value: (
              <>
                {mtFacility.MountainToMtFacility?.map((mtToFcy, i) => {
                  return (
                    <div key={i}>
                      <Link
                        component={NextLink}
                        href={`${paths.mountain.index.path}/${mtToFcy.mountainId}`}
                        target="_blank"
                        sx={{color: 'black', width: '200px', textDecoration: 'underline', '&:hover': {textDecoration: 'underline'}}}
                      >
                        {mtToFcy.Mountain.name}
                      </Link>
                      から{mtToFcy.timeFrom}分{/* <div>（{access.remark}）</div> */}
                    </div>
                  );
                })}
              </>
            ),
          },
          {key: '標高', value: <>{mtFacility.listElevation?.toLocaleString()}m</>},
          {
            key: '電波',
            value: (
              <>
                <div>
                  {mtFacility.docomo === 1 && 'docomo, '}
                  {mtFacility.docomo === 2 && '（docomo）, '}
                  {mtFacility.au === 1 && 'au, '}
                  {mtFacility.au === 2 && '（au）, '}
                  {mtFacility.softbank === 1 && 'softbank, '}
                  {mtFacility.softbank === 2 && '（softBank）, '}
                  {mtFacility.rakuten === 1 && 'Rakuten, '}
                  {mtFacility.rakuten === 2 && '（Rakuten）, '}
                </div>
                <div>{mtFacility.listConnectionRemark && `※${mtFacility.listConnectionRemark}`}</div>
              </>
            ),
          },
          {
            key: '決済方法',
            value: (
              <>
                {mtFacility.MtFacilityToPayMethod?.map((access, idx) => (
                  <div key={idx}>
                    <span>{access.PayMethod.name}</span>
                  </div>
                ))}
              </>
            ),
          },
          {
            br: true,
            key: '設備',
            value: (
              <DynamicTable
                data={[
                  [
                    {key: '宿泊施設', value: tfStr(mtFacility.tStay)},
                    {key: 'カフェスペース', value: tfStr(mtFacility.tCafeSpace)},
                    {key: 'テント場', value: tfStr(mtFacility.tTent)},
                    {key: '売店', value: tfStr(mtFacility.tShop)},
                    {key: 'トイレ', value: tfStr(mtFacility.tToilet)},
                    {key: '洗面台', value: tfStr(mtFacility.tBathSink)},
                    {key: '更衣室', value: tfStr(mtFacility.tChangingRoom)},
                    {key: '乾燥室', value: tfStr(mtFacility.tDryRoom)},
                    {key: 'お風呂', value: tfStr(mtFacility.tBath)},
                    {key: '電波', value: tfStr(mtFacility.tWave)},
                    {key: 'Wifi', value: tfStr(mtFacility.tWifi)},
                    {key: '公衆電話', value: tfStr(mtFacility.tPublicPhone)},
                    {key: '自炊場', value: tfStr(mtFacility.tKitchen)},
                    {key: '談話室', value: tfStr(mtFacility.tTalkRoom)},
                    {key: 'その他', value: tfStr(mtFacility.tOther)},
                  ],
                ]}
              />
            ),
          },
        ]}
      />
    </>
  );
};

export default BasicInfo;
