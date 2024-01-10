import {Fragment} from 'react';
import {css} from 'styled-system/css';
import ExpandableContainer from 'src/components/feature/ExpandableContainer';
import Iconify from 'src/components/iconify';
import convertLines from 'src/components/feature/ConvertLines';
import {convertMinutesToTime} from 'src/functions/etc';
import type {getTrailheadRoutesApi} from '../../../../api';

type RoutePlanItemProps = {
  routeGroup: NonNullable<ReturnType<typeof getTrailheadRoutesApi>['data']>[0];
};
export default function RoutePlanItem({routeGroup}: RoutePlanItemProps) {
  const route = routeGroup.routes;
  const totalPayment = route.reduce((acc, route) => acc + (route.payment || 0), 0);
  const totalTime = route.reduce((acc, route) => acc + (route.time || 0), 0);
  return (
    <div className={css({border: '5px solid #71BFD8', borderRadius: '18px', ml: '1.5rem', mr: '1.5rem', padding: '20px'})}>
      {/* 合計時間・金額・乗換回数 */}
      <div className={css({display: 'flex', alignItems: 'center'})}>
        <div className={css({ml: '1rem', color: '#323232'})}>合計: {convertMinutesToTime(totalTime)}</div>
        <div className={css({ml: 'auto', mr: '1rem', color: '#323232'})}>乗換{route.length - 2}回</div>
      </div>
      <div className={css({ml: '1rem', mb: '0.5rem', color: '#323232'})}>¥{totalPayment.toLocaleString()}</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridTemplateRows: 'repeat(12, 30px)',
          padding: '10px',
        }}
      >
        {route.map((point, idx) => (
          <Fragment key={idx}>
            {/* 地点 */}
            <div
              style={{
                fontSize: '16px',
                fontWeight: 'bolder',
                color: '#fff',
                letterSpacing: point.name.length < 6 ? '0.2rem' : '',
                background: '#71BFD8',
                height: '100%',
                borderRadius: '3px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gridColumn: '1/ 13',
                gridRow: `${idx * 3 + 1}`,
              }}
            >
              {point.name}
            </div>
            {/* 時間 */}
            {point.time && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#636363',
                  height: '100%',
                  borderRadius: '3px',
                  gridColumn: '1/ 5',
                  gridRow: `${idx * 3 + 2}`,
                }}
              >
                {convertMinutesToTime(point.time)}
              </div>
            )}
            {/* 移動手段の名前 */}
            {point.methodName && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  fontSize: '13px',
                  color: '#636363',
                  height: '100%',
                  gridColumn: '7/ 13',
                  gridRow: `${idx * 3 + 2}`,
                }}
              >
                {point.url ? (
                  <a
                    href={point.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{textDecoration: 'underline', color: '#636363', display: 'flex', alignItems: 'center'}}
                  >
                    {point.methodName}
                    <Iconify icon="gridicons:external" width={19} />
                  </a>
                ) : (
                  <span style={{color: '#636363', alignItems: 'center'}}>{point.methodName}</span>
                )}
              </div>
            )}
            {/* 値段 */}
            {point.payment && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  fontSize: '12px',
                  color: '#636363',
                  gridColumn: '10/ 13',
                  gridRow: `${idx * 3 + 3}`,
                }}
              >
                ¥{point.payment.toLocaleString()}
              </div>
            )}
            {/* 線 */}
            {point.type !== 'end' && (
              <>
                {point.methodType === 'bus' && (
                  <div
                    style={{
                      borderLeft: '3px solid #FFE500',
                      height: '100%',
                      gridColumn: '7',
                      gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
                    }}
                  />
                )}
                {point.methodType === 'train' && (
                  <div
                    style={{
                      background: 'linear-gradient(to bottom, black 50%, white 50%)',
                      backgroundSize: '100% 14px',
                      width: '2.5px',
                      height: '100%',
                      gridColumn: '7',
                      gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
                      boxShadow: '0.7px 0 0 0 black, -0.7px 0 0 0 black',
                    }}
                  />
                )}
                {point.methodType === 'walk' && (
                  <div
                    style={{
                      borderLeft: '3px dotted #C0C0C0',
                      height: '100%',
                      gridColumn: '7',
                      gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
                    }}
                  />
                )}
                {point.methodType === 'taxi' && (
                  <div
                    style={{
                      borderLeft: '3px solid #FF2E3A',
                      height: '100%',
                      gridColumn: '7',
                      gridRow: `${idx * 3 + 2} / ${idx * 3 + 4}`,
                    }}
                  />
                )}
              </>
            )}
          </Fragment>
        ))}{' '}
      </div>
      {/* 山ノート */}
      {true && (
        <div className={css({color: '#636363', gridColumn: '1/13', mt: '1rem', ml: '0.5rem', mr: '0.5rem'})}>
          <ExpandableContainer maxHeightInRem={3}>
            <div className={css({backgroundColor: '#EDEDED', borderRadius: '0.5rem'})}>
              <div className={css({padding: '1rem'})}>
                {/* アイコンと「メモ」のテキストを横並びにするためのdiv */}
                <div className={css({display: 'flex', alignItems: 'center'})}>
                  <Iconify icon="ci:note-edit" width={24} />
                  <span
                    className={css({
                      ml: '0.5rem',
                      fontWeight: 'bolder',
                    })}
                  >
                    メモ
                  </span>
                </div>

                {/* コメント部分 */}
                <div className={css({fontSize: '0.9rem', color: '#323232'})}>{convertLines(routeGroup.remark)}</div>
              </div>
            </div>
          </ExpandableContainer>
        </div>
      )}
    </div>
  );
}
