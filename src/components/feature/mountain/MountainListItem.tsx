import NextLink from 'next/link';
import {paths} from 'src/routes/paths';
import {css} from 'styled-system/css';
import Iconify from 'src/components/iconify/Iconify';
import NextImage from 'next/image';
import {AppRouter} from 'server/routers/_app';
import {inferProcedureOutput} from '@trpc/server';
import TextTag from 'src/components/ui/TextTag';

import {convertMinutesToTime} from 'src/functions/etc';
import {useGlobalState} from 'src/components/provider/useGlobalStore';

type MountainType = inferProcedureOutput<AppRouter['mountains']['findMany']>;

function MountainListItem({mountain: m}: {mountain: MountainType['result'][number]}) {
  const [, setActiveTab] = useGlobalState('mountainDetailTabValue', 'すべて'); // 遷移時にdetailのtabをリセットするため
  /* データ取得 */

  /* 定数宣言 */
  const {uphillTime, travelDistance, travelTime} = m;
  const tags = [
    // これどうにかして
    {百名山: m.hyakumeizanStatus},
    {二百名山: m.nihyakumeizanStatus},
    {日帰り: m.stay0n1d},
    {一泊二日: m.stay1n2d},
    {二泊三日: m.stay2n3d},
    {三泊四日: m.stay3n4d},
    {四泊五日: m.stay4n5d},
    {五泊六日: m.stay5n6d},
    {六泊七日: m.stay6n7d},
  ];

  /* handle */
  const handleTransition = () => {
    // 遷移時に一緒に呼ばれる関数、これにreset系の処理を入れる
    setActiveTab('すべて');
  };

  return (
    <div className={css({width: '100%', overflowX: 'hidden'})}>
      <NextLink href={`${paths.mountain.index.path}/${m.id}`} color="inherit" onClick={handleTransition}>
        {/* 名前・エリア・標高 */}
        <div className={css({display: 'flex', alignItems: 'center', justifyContent: 'space-between', mx: 3})}>
          {/* 名前とエリア */}
          <div className={css({display: 'flex'})}>
            <div style={{fontSize: '17px', fontWeight: 'bold'}}>{m.name}</div>
            <div className={css({color: '#636363', display: 'flex', alignItems: 'center', ml: 3})}>
              <Iconify icon="mdi:map-marker" width="14px" sx={{mx: 0.5}} />
              <span className={css({fontSize: '13px'})}>{m.prefecture}、エリア</span>
            </div>
          </div>
          {/* 標高 */}
          <div className={css({display: 'flex'})}>
            <NextImage src="/assets/icons/custom/mountain.svg" alt="Icon" width={25} height={25} priority />
            <span className={css({fontSize: '15px', ml: 1, fontWeight: 'bold'})}>
              {m.elevation ? m.elevation.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,') : '?'}m
            </span>
          </div>
        </div>

        {/* 登山口まで */}
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            mx: 3,
            mt: '7.9px',
          })}
        >
          <NextImage src="/assets/icons/custom/map_pin_time.svg" unoptimized alt="Icon" width={25} height={25} className={css({mr: 2})} />
          <span className={css({fontSize: '12px', mr: 2})}>登山口まで</span>
          <span style={{fontSize: '15px', fontWeight: 'bold'}}>{travelDistance ? `${travelDistance}km` : '-'}</span>
          {travelTime && <span className={css({fontSize: '12px'})}>（車での目安 {convertMinutesToTime(travelTime)}）</span>}
        </div>

        {/* 山頂まで */}
        <div
          className={css({
            display: 'flex',
            alignItems: 'center',
            ml: 3.5,
            mt: 1.5,
          })}
        >
          <NextImage src="/assets/icons/custom/mountain_up.svg" unoptimized alt="Icon" width={19} height={19} className={css({mr: 3})} />
          <span className={css({fontSize: '12px', mr: 1})}>山頂まで</span>
          {/* <span className={css({fontSize: '15px', fontWeight: 'bold'})}>{uphillDistance ? `${uphillDistance / 1000}km` : '-'}</span> */}
          {uphillTime && (
            <span className={css({fontSize: '15px', ml: 4})}>
              <strong>{convertMinutesToTime(uphillTime)}</strong>
            </span>
          )}
        </div>

        {/* タグ */}
        <div className={css({mx: 2.5, mt: '4px'})}>
          {tags.map((tag, i) => {
            // tagsの中にtrueのものだけ表示
            const key = Object.keys(tag)[0];
            const value = Object.values(tag)[0];
            if (value) {
              return <TextTag key={i} text={key} bc="#205676" sx={{ml: 0.3}} />;
            }
            return '';
          })}
        </div>

        {/* 画像 */}
        <div
          className={css({
            mt: '7px',
            width: '100%',
            height: 'auto',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            pl: 3,
            '&::-webkit-scrollbar': {
              display: 'none', // スクロールバーの非表示
              WebkitAppearance: 'none', // スクロールバーの非表示
            },
          })}
        >
          {m.Photo.map((photo, i) => (
            <div
              key={i}
              className={css({
                position: 'relative',
                display: 'inline-block',
                width: '200px',
                aspectRatio: '3/2',
                mr: '3px',
              })}
            >
              <NextImage
                src={photo.thumbnail || '/assets/transparent.png'}
                alt={`${m.name}の写真`}
                fill
                className={css({
                  objectFit: 'cover',
                  ...(i === 0 && {
                    borderLeftRadius: '7px',
                  }),
                })}
              />
            </div>
          ))}
        </div>

        {/* 区切り線 */}
        <div
          className={css({
            mt: 5,
            mb: 5,
            mx: 'auto',
            width: '96%',
            height: '0.5px',
            background: '#EDEDED',
          })}
        />
      </NextLink>
    </div>
  );
}

export default MountainListItem;
