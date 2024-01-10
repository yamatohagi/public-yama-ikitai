import NextImage from 'next/image';
import Link from 'next/link';
import {CSSProperties, Fragment} from 'react';
import {css} from 'styled-system/css';
import GetMemoList from './api';

export default function MtMemo({style = {marginTop: '0.8rem'}}: {style?: CSSProperties}) {
  const {mtUrlMemos} = GetMemoList();

  return (
    <div className={css({mx: 2})}>
      {mtUrlMemos ? (
        <>
          {mtUrlMemos.map((mtUrlMemo, i) => (
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
                  {mtUrlMemo.name}
                </div>
                <div
                  style={{
                    marginTop: '0.5rem',
                    background: '#EDEDED',
                    borderRadius: '9px',
                  }}
                >
                  <Link href="/your-link-url">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginLeft: '0.25rem',
                        padding: '0.5rem',
                        paddingBottom: '0.3rem',

                        fontSize: '0.8rem',
                        letterSpacing: '-0.3px',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{fontWeight: 'bold'}}>運賃・時刻表｜中央アルプス駒ヶ岳ロープウェイ</div>
                        <div
                          style={{
                            color: '#636363',
                            fontSize: '0.7rem',
                          }}
                        >
                          chuo-alps.com
                        </div>
                      </div>
                      <NextImage
                        unoptimized
                        src="/assets/icons/custom/web_test_fav.svg"
                        alt="Icon"
                        width={25}
                        height={25}
                        style={{
                          marginRight: '0.2rem',
                          marginBottom: '0.5rem',
                          marginLeft: '0.1rem',
                        }}
                      />
                    </div>
                  </Link>
                </div>

                <div
                  style={{
                    marginLeft: '0.25rem',
                    marginTop: '0.9rem',
                    color: '#323232',
                    fontSize: '0.8rem',
                  }}
                >
                  備考：バスの時間
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
