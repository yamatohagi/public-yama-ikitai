import {Grid} from '@mui/material';
import {Fragment} from 'react';
import {css} from 'styled-system/css';

export type TableDataItem = {
  br?: boolean;
  key: string;
  value: React.ReactElement | string | number | null | undefined;
}[];
interface InfoSplitDividerItemProps {
  data?: TableDataItem;
}
export const InfoSplitDividerItem = ({data}: InfoSplitDividerItemProps) => (
  <>
    {data?.flatMap((item, index) => (
      <Fragment key={index}>
        {index === 0 && (
          <Grid item xs={12} sm={12} sx={{mt: 0}}>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.0em'}}>
              <div
                style={{
                  width: '93%',
                  height: '0.08rem',
                  background: '#EDEDED',
                }}
              />
            </div>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          {item.br ? <BrKeyValue item={item} /> : <NormalKeyValue item={item} />}
        </Grid>
        <Grid item xs={12} sm={12} sx={{mt: 0}}>
          <div style={{display: 'flex', justifyContent: 'center', marginTop: '1.0em'}}>
            <div
              style={{
                width: '93%',
                height: '0.08rem',
                background: '#EDEDED',
              }}
            />
          </div>
        </Grid>
      </Fragment>
    ))}
  </>
);

const NormalKeyValue = ({item}: {item: TableDataItem[number]}) => (
  <div style={{display: 'flex', marginTop: '1.0rem'}}>
    <div style={{flex: 3, fontWeight: 'bold'}}>
      <span style={{marginLeft: '1.5rem'}}>{item.key}</span>
    </div>
    <div style={{flex: 7}}>{item.value}</div>
  </div>
);

const BrKeyValue = ({item}: {item: TableDataItem[number]}) => (
  <div style={{marginTop: '1.0rem'}}>
    <div style={{fontWeight: 'bold'}}>
      <span style={{marginLeft: '1.5rem'}}>{item.key}</span>
    </div>
    <div className={css({mx: 5, mt: 2})}>{item.value}</div>
  </div>
);
