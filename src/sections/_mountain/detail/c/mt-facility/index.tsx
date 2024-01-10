import Link from 'next/link';
import {Fragment, useState} from 'react';
import {paths} from 'src/routes/paths';
import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {convertMinutesToTime} from 'src/functions/etc';
import DynamicTable, {TableData} from 'src/components/ui/DynamicTable';
import {css} from 'styled-system/css';
import GetMtFacility from './api';

export default function MtFacility() {
  const [select] = useState('山小屋');

  const {mtToMtFacility} = GetMtFacility();

  return (
    <>
      {/* 項目 */}
      <Grid item xs={12} sm={12} sx={{mt: 7}}>
        <div style={{marginLeft: '0.2rem'}}>
          <TitleStartIcon sx={{ml: 0.2}} />
          <span
            style={{
              fontWeight: 'bold',
              fontSize: '1.1rem',
              marginLeft: '0.5rem',
            }}
          >
            宿泊・休憩
          </span>
        </div>
      </Grid>
      <Grid item xs={12} sm={12}>
        <div className={css({mx: 2})}>
          {mtToMtFacility ? (
            mtToMtFacility.map((mtToFcy, i) => {
              const toMtPeek = mtToFcy.timeFrom;
              const tableData: {[key: string]: TableData} = {
                山小屋: [
                  [
                    {
                      key: '山頂まで',
                      value: toMtPeek ? convertMinutesToTime(toMtPeek) : null,
                    },
                    {key: '虫', value: 'あとでどうにかして'},
                  ],
                ],
                テント場: [
                  [
                    {
                      key: '山頂まで',
                      value: toMtPeek ? convertMinutesToTime(toMtPeek) : null,
                    },
                  ],
                ],
              };

              return (
                <Fragment key={i}>
                  <div style={{marginTop: '1.3rem'}}>
                    <Link href={`${paths.mtFacility.index.path}/${1}`}>
                      <div
                        style={{
                          marginTop: '0.5rem',
                          fontWeight: 'bold',
                          color: '#367B9D',
                          fontSize: '0.9rem',
                          textDecoration: 'underline',
                        }}
                      >
                        {mtToFcy.MtFacility?.name}
                      </div>
                    </Link>
                    <div
                      style={{
                        marginTop: '0.2rem',
                        color: '#636363',
                        fontSize: '0.9rem',
                        fontStyle: 'normal',
                        fontWeight: '400',
                      }}
                    >
                      {mtToFcy.MtFacility?.remark}
                    </div>
                  </div>

                  <div style={{marginTop: '1.5rem'}}>
                    <DynamicTable data={tableData[select]} />
                  </div>
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: '2.4rem'}}>
                    <div
                      style={{
                        width: '97%',
                        height: '0.08rem',
                        background: '#EDEDED',
                      }}
                    />
                  </div>
                </Fragment>
              );
            })
          ) : (
            <>ロード中</>
          )}
        </div>
      </Grid>
    </>
  );
}
