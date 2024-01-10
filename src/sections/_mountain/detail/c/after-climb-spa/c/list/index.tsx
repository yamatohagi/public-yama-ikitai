import {CSSProperties, Fragment} from 'react';
import {css} from 'styled-system/css';
import GetMemoList from './api';

export default function MtMemo({style = {marginTop: '0.8rem'}}: {style?: CSSProperties}) {
  const {data} = GetMemoList();

  return (
    <div className={css({mx: 2})}>
      {data ? (
        <>
          {data.map((afterClimbMeal, i) => (
            <Fragment key={i}>
              <div style={{...style}}>
                <div
                  style={{
                    marginTop: '0.05rem',
                    fontWeight: 'bold',
                    color: '#367B9D',
                    fontSize: '0.9rem',
                  }}
                >
                  {afterClimbMeal.name}
                </div>
                <div
                  style={{
                    marginTop: '0.5rem',
                    background: '#EDEDED',
                    borderRadius: '9px',
                  }}
                />

                <div
                  style={{
                    marginLeft: '0.25rem',
                    marginTop: '0.9rem',
                    color: '#636363',
                    fontSize: '0.8rem',
                  }}
                >
                  {afterClimbMeal.remark}
                </div>
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.3rem'}}>
                  <div
                    style={{
                      width: '97%',
                      height: '0.08rem',
                      background: '#EDEDED',
                    }}
                  />
                </div>
              </div>
            </Fragment>
          ))}
        </>
      ) : (
        <>ロード</>
      )}
    </div>
  );
}
