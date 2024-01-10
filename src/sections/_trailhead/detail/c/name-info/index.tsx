import {Grid} from '@mui/material';
import FacilityTypesTag from 'src/components/ui/CommonTag';
import Iconify from 'src/components/iconify/Iconify';
import {css} from 'styled-system/css';

type NameInfoProps = {
  name: string;
  tags: {
    FacilityTag: {
      id: number;
      name: string | null;
    };
  }[];
  prefecture: string | null;
};

const NameInfo = ({name, tags, prefecture}: NameInfoProps) => {
  console.log('NameInfo');

  return (
    <div className={css({ml: 2})}>
      <Grid item xs={12} sm={12} sx={{mt: 5}}>
        {tags.map((tag) => (
          <FacilityTypesTag key={tag.FacilityTag.id} text={tag.FacilityTag.name} tc="#636363" bc="white" border="1.5px solid #636363" sx={{mr: 1}} />
        ))}
      </Grid>
      <Grid item xs={12} sm={12} sx={{}}>
        <div style={{fontSize: '1.7rem', fontWeight: 'bold'}}>{name}</div>
      </Grid>
      <Grid item xs={12} sm={12} sx={{mt: 1.0}} style={{display: 'flex', color: '#636363'}}>
        <Iconify icon="mdi:map-marker" width={19} sx={{marginRight: 0.3}} />
        <div style={{fontSize: '0.9rem'}}>{prefecture}</div>
      </Grid>
    </div>
  );
};

export default NameInfo;
