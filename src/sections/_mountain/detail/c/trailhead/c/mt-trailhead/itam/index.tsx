import CommonTag from 'src/components/ui/CommonTag';
import Link from 'next/link';
import {paths} from 'src/routes/paths';
import {Grid} from '@mui/material';
import {css} from 'styled-system/css';
import Image from 'next/image';
import RatingCustom from 'src/components/ui/RatingCustom';
import {useMtSearchSetting} from 'src/components/provider/mtSearchLatLngStore';
import {trpc} from 'src/utils/trpc';
import {convertMinutesToTime} from 'src/functions/etc';
import {useModalState} from 'src/components/provider/useModalStateJotai';
import {useAuth} from 'src/hooks/use-auth';
import {useEffect} from 'react';
import {useAtom} from 'jotai';
import {MtTrailheadType} from '../type';
import {MtThRatingPostModalAtom} from '../MtThRatingPostModal';
import {MtTrailHeadRatingTimeStampAtom} from './state';

export default function MtTrailHeadItem({mtTrailHead, i}: {mtTrailHead: MtTrailheadType; i: number}) {
  /* 定数宣言 */
  const {openModal} = useModalState(MtThRatingPostModalAtom);
  const {userId, loginCheck} = useAuth();
  const [refetchTimeStamp] = useAtom(MtTrailHeadRatingTimeStampAtom);

  const endName = mtTrailHead.Trailhead.Parking[0]?.name || '';
  if (!endName) console.log('parking Name is null');
  const [mtSearchSetting] = useMtSearchSetting();

  /* データ取得 */

  // TrailheadRatingHistoryを取得
  const {data: trailheadRatingHistory, refetch: trailheadRatingHistoryRefetch} = trpc.mtThRating.findManyByUser.useQuery({
    trailheadId: mtTrailHead.Trailhead.id,
    userId,
  });

  // TrailheadRatingを取得
  const {data: trailheadRating, refetch: trailheadRatingRefetch} = trpc.mtThRating.findMany.useQuery({
    trailheadId: mtTrailHead.Trailhead.id,
  });

  useEffect(() => {
    trailheadRatingHistoryRefetch();
    trailheadRatingRefetch();
  }, [refetchTimeStamp]);

  const popularRating = trailheadRating?.find((info) => info.featureType === '人気度');
  const hpRating = trailheadRating?.find((info) => info.featureType === '体力度');

  return (
    <>
      <Grid container style={{marginTop: '0.3rem'}}>
        <Grid item xs={12} sm={12}>
          <Link href={`${paths.mtTrailhead.index.path}/${mtTrailHead.Trailhead.id}`}>
            {i === 0 && <CommonTag text="最短" bc="#FA541C" />}
            <span
              style={{
                fontWeight: 'bold',
                color: '#367B9D',
                fontSize: '1rem',
                marginLeft: '0.4rem',
                verticalAlign: 'middle',
                textDecoration: 'underline',
              }}
            >
              {mtTrailHead.Trailhead.name}
            </span>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12}>
          <div
            className={css({
              mt: '0.2rem',
              ml: 2,
              color: '#636363',
              fontSize: '0.9rem',
              fontStyle: 'normal',
              fontWeight: '400',
            })}
          >
            {mtTrailHead.Trailhead.intro}
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* 登山時間 */}
          <div
            className={css({
              mt: '5px',
              ml: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({alignItems: 'flex-start'})}>
              <span className={css({fontWeight: 'semibold'})}>登山時間</span>
            </div>
            <div className={css({alignItems: 'flex-end'})}>
              {mtTrailHead.uphillTime && mtTrailHead.downhillTime ? (
                <div className={css({display: 'flex', alignItems: 'center', mr: 2})}>
                  <Image
                    unoptimized
                    style={{marginRight: '0.3rem', marginTop: '1px'}}
                    alt="icon"
                    src="/assets/icons/custom-ui-icon/yazirushi/up_naname.svg"
                    width={14}
                    height={14}
                  />
                  <span>{convertMinutesToTime(mtTrailHead.uphillTime)}</span>
                  <span className={css({mx: '4px'})}>/</span>
                  <Image
                    unoptimized
                    className={css({marginRight: '0.3rem', marginTop: '1px'})}
                    alt="icon"
                    src="/assets/icons/custom-ui-icon/yazirushi/down_naname.svg"
                    width={14}
                    height={14}
                  />
                  <span>{convertMinutesToTime(mtTrailHead.downhillTime)}</span>
                </div>
              ) : (
                `-`
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* 登山距離 */}
          <div
            className={css({
              mt: '3px',
              ml: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({alignItems: 'flex-start'})}>
              <span className={css({fontWeight: 'semibold'})}>登山距離</span>
            </div>
            <div className={css({alignItems: 'flex-end'})}>
              {mtTrailHead.uphillDistance && mtTrailHead.downhillDistance ? (
                <div className={css({display: 'flex', alignItems: 'center', mr: 2})}>
                  <Image
                    style={{marginRight: '0.3rem', marginTop: '1px'}}
                    alt="icon"
                    src="/assets/icons/custom-ui-icon/yazirushi/up_naname.svg"
                    width={14}
                    height={14}
                  />
                  <span>{convertMeterKilo(mtTrailHead.uphillDistance)}km</span>
                  <span className={css({mx: '4px'})}>/</span>
                  <Image
                    unoptimized
                    className={css({marginRight: '0.3rem', marginTop: '1px'})}
                    alt="icon"
                    src="/assets/icons/custom-ui-icon/yazirushi/down_naname.svg"
                    width={14}
                    height={14}
                  />
                  <span>{convertMeterKilo(mtTrailHead.downhillDistance)}km</span>
                </div>
              ) : (
                `-`
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* 人気度 */}
          <div
            className={css({
              ml: 2,
              mt: '3px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({alignItems: 'flex-start'})}>
              <div className={css({display: 'flex', alignItems: 'center'})}>
                <span className={css({fontWeight: 'semibold'})}>人気度</span>
                {!trailheadRatingHistory?.find((info) => info.featureType === '人気度') && (
                  <button
                    onClick={() =>
                      loginCheck() &&
                      openModal({
                        featureType: '人気度',
                        trailheadId: mtTrailHead.Trailhead.id,
                      })
                    }
                    type="button"
                    className={css({
                      margin: '0 5px 0 5px',
                      alignItems: 'flex-end',
                      border: '2.2px solid #367B9D',
                      borderRadius: '6px',
                      color: '#367B9D',
                      fontWeight: 'semibold',
                      paddingLeft: '0.25rem',
                      paddingRight: '0.25rem',
                      fontSize: '0.75rem',
                    })}
                  >
                    投票する
                  </button>
                )}
              </div>
            </div>
            <div className={css({alignItems: 'flex-end'})}>
              {popularRating ? (
                <div className={css({display: 'flex', alignItems: 'center', mr: 2})}>
                  <span
                    className={css({
                      fontWeight: 'semibold',
                      fontSize: '1.1rem',

                      color: '#636363',
                    })}
                  >
                    {popularRating.rating.toFixed(1)}
                  </span>
                  <RatingCustom
                    size={21}
                    style={{
                      marginTop: '-3px',
                      marginLeft: '0.3rem',
                      marginRight: '0.3rem',
                    }}
                    ratingValue={Math.floor(popularRating.rating || 0)}
                    totalRating={3}
                    activeIconPath="/assets/icons/custom/天の川/active.svg"
                    passiveIconPath="/assets/icons/custom/天の川/passive.svg"
                  />
                </div>
              ) : (
                `-`
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* 体力度 */}
          <div
            className={css({
              ml: 2,
              mt: '3px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({alignItems: 'flex-start'})}>
              <div className={css({display: 'flex', alignItems: 'center'})}>
                <span className={css({fontWeight: 'semibold'})}>体力度</span>
                {!trailheadRatingHistory?.find((info) => info.featureType === '体力度') && (
                  <button
                    onClick={() =>
                      loginCheck() &&
                      openModal({
                        featureType: '体力度',
                        trailheadId: mtTrailHead.Trailhead.id,
                      })
                    }
                    type="button"
                    className={css({
                      margin: '0 5px 0 5px',
                      alignItems: 'flex-end',
                      border: '2.2px solid #367B9D',
                      borderRadius: '6px',
                      color: '#367B9D',
                      fontWeight: 'semibold',
                      paddingLeft: '0.25rem',
                      paddingRight: '0.25rem',
                      fontSize: '0.75rem',
                    })}
                  >
                    投票する
                  </button>
                )}
              </div>
            </div>
            <div className={css({alignItems: 'flex-end'})}>
              {hpRating ? (
                <div className={css({display: 'flex', alignItems: 'center', mr: 2})}>
                  <span
                    className={css({
                      fontWeight: 'semibold',
                      fontSize: '1.1rem',

                      color: '#636363',
                    })}
                  >
                    {hpRating.rating.toFixed(1)}
                  </span>
                  <RatingCustom
                    size={23}
                    style={{
                      marginTop: '-3px',
                      marginLeft: '0.0rem',
                      marginRight: '0.3rem',
                    }}
                    ratingValue={Math.floor(hpRating.rating || 0)}
                    totalRating={3}
                    activeIconPath="/assets/icons/custom/体力度/active.svg"
                    passiveIconPath="/assets/icons/custom/体力度/passive.svg"
                  />
                </div>
              ) : (
                `-`
              )}
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={12}>
          {/* 駐車場 */}
          <div
            className={css({
              ml: 2,
              mt: '3px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({alignItems: 'flex-start'})}>
              <div className={css({display: 'flex', alignItems: 'center'})}>
                <span className={css({fontWeight: 'semibold'})}>駐車場</span>
              </div>
            </div>
            <div className={css({alignItems: 'flex-end'})}>
              {mtTrailHead.Trailhead.Parking ? (
                <div className={css({display: 'flex', alignItems: 'center', mr: 2})}>
                  <Image
                    className={css({marginRight: '0.1rem', marginTop: '1px'})}
                    alt="icon"
                    unoptimized
                    src="/assets/icons/custom-ui-icon/map/simple_map.svg"
                    width={16}
                    height={16}
                  />
                  <Link href={`${paths.mtTrailhead.index.path}/${mtTrailHead.id}`}>
                    <span className={css({textDecoration: 'underline', color: '#323232'})}>{mtTrailHead.Trailhead.Parking[0]?.name}</span>
                  </Link>
                </div>
              ) : (
                `-`
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* ラスコン */}
          <div
            className={css({
              ml: 2,
              mt: '3px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({alignItems: 'flex-start'})}>
              <div className={css({display: 'flex', alignItems: 'center'})}>
                <span className={css({fontWeight: 'semibold'})}>ラスコン</span>
              </div>
            </div>
            <div className={css({alignItems: 'flex-end'})}>
              {mtTrailHead.Trailhead ? (
                <div className={css({display: 'flex', alignItems: 'center', mr: 2})}>
                  <Image
                    className={css({marginRight: '0.1rem', marginTop: '1px'})}
                    alt="icon"
                    unoptimized
                    src="/assets/icons/custom-ui-icon/map/simple_map.svg"
                    width={16}
                    height={16}
                  />
                  <Link href={`${paths.mtTrailhead.index.path}/${mtTrailHead.id}`}>
                    <span className={css({textDecoration: 'underline', color: '#323232'})}>{mtTrailHead.Trailhead.lastConbiniName}</span>
                  </Link>
                </div>
              ) : (
                `-`
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          {/* 備考 */}
          <div
            className={css({
              mx: 2,
              mt: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#323232',
            })}
          >
            <div className={css({})}>
              <div className={css({fontWeight: 'semibold'})}>備考</div>
              <div className={css({color: '#323232'})}>{mtTrailHead.Trailhead.remark}</div>
            </div>
          </div>
        </Grid>
      </Grid>
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '2.0rem'}}>
        <div
          style={{
            width: '97%',
            height: '0.08rem',
            background: '#EDEDED',
          }}
        />
      </div>
    </>
  );
}

function convertMeterKilo(meters: number) {
  return Math.floor(meters / 1000);
}
