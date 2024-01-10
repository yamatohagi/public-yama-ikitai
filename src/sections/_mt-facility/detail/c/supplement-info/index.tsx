import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';

const SupplementInfo = ({remark}: {remark: string | null}) => (
  <>
    <Grid item xs={12} sm={12} sx={{mt: 4}}>
      <div style={{marginLeft: '0.7rem'}}>
        <TitleStartIcon sx={{ml: 0.2}} />
        <span
          style={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginLeft: '0.5rem',
          }}
        >
          施設補足情報
        </span>
      </div>
    </Grid>
    <Grid item xs={12} sm={12} sx={{mt: 3}}>
      <div
        style={{
          fontSize: '1rem',
          marginLeft: '1.5rem',
        }}
      >
        {remark}
      </div>
    </Grid>
  </>
);
export default SupplementInfo;
