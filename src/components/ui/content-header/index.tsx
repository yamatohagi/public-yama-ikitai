import {Grid} from '@mui/material';
import TitleStartIcon from 'src/components/ui/TitleStartIcon';
import {css} from 'styled-system/css';

type ContentHeaderProps = {
  title: string;
};
export default function ContentHeader({title}: ContentHeaderProps) {
  return (
    <Grid item xs={12} sm={12} sx={{mt: 4}}>
      <div className={css({marginLeft: '0.2rem', mb: 4})}>
        <TitleStartIcon sx={{ml: 1.5}} />
        <span className={css({fontWeight: 'bold', fontSize: '1.1rem', marginLeft: '0.5rem'})}>{title}</span>
      </div>
    </Grid>
  );
}
