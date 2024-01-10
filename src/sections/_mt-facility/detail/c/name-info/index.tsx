import {Grid} from '@mui/material';
import FacilityTypesTag from 'src/components/ui/CommonTag';
import Iconify from 'src/components/iconify/Iconify';
import {css} from 'styled-system/css';

type NameInfoProps = {
  name: string;
  tags: {
    id: number;
    name: string;
  }[];
  prefecture: string | null;
};

const NameInfo = ({name, tags, prefecture}: NameInfoProps) => (
  <>
    <Grid item xs={12} sm={12} sx={{mt: 5}}>
      <div className={css({ml: '0.7rem'})}>
        {tags.map((tag) => (
          <FacilityTypesTag key={tag.id} text={tag.name} tc="#636363" bc="white" border="1.5px solid #636363" sx={{mr: 1}} />
        ))}
      </div>
    </Grid>
    <Grid item xs={12} sm={12} sx={{}}>
      <div style={{fontSize: '1.7rem', fontWeight: 'bold', marginLeft: '1rem'}}>{name}</div>
    </Grid>
    <Grid item xs={12} sm={12} sx={{mt: 1.0}} style={{display: 'flex', color: '#636363', marginLeft: '0.7rem'}}>
      <Iconify icon="mdi:map-marker" width={19} sx={{marginRight: 0.3}} />
      <div style={{fontSize: '0.9rem'}}>{prefecture}</div>
    </Grid>
  </>
);

export default NameInfo;
