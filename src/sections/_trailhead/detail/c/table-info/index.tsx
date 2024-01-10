import {Grid} from '@mui/material';
import DynamicTable from 'src/components/ui/DynamicTable';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';
import {tfStr} from 'src/functions/tfStr';
import {TrailheadGetReturnType} from '../../api';

type TableInfoProps = {
  trailhead: TrailheadGetReturnType;
};

export default function TableInfo({trailhead}: TableInfoProps) {
  return (
    <>
      {/* 見出し */}
      <Grid item xs={12} sm={12} sx={{mt: 4}}>
        <div className={css({marginLeft: '0.2rem', mb: 4})}>
          <TitleStartIcon sx={{ml: 1.5}} />
          <span className={css({fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem'})}>基本情報</span>
        </div>
      </Grid>
      {/* 表 */}
      <Grid item xs={12} sm={12}>
        <div className={css({mx: 4})}>
          <DynamicTable
            data={[
              [
                {
                  key: `自販機`,

                  value: <>{tfStr(trailhead.store)}</>,
                },
              ],
            ]}
          />
        </div>
      </Grid>
    </>
  );
}
