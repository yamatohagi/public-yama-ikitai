import {css} from 'styled-system/css';
import Iconify from 'src/components/iconify/Iconify';
import {Grid} from '@mui/material';
import {atom, useAtom} from 'jotai';
import {TrailheadRouteGroupType} from '@prisma/client';

type AccessMethodButtonProps = {
  title?: string;
};

export const AccessMethodButtonValueAtom = atom<TrailheadRouteGroupType>('myCar');

export default function AccessMethodButton({title}: AccessMethodButtonProps) {
  const [value, setValue] = useAtom(AccessMethodButtonValueAtom);

  const handleButtonClick = (value: 'myCar' | 'publicTransport') => {
    setValue(value);
  };
  return (
    <Grid item xs={12} sm={12}>
      <div className={css({mb: 3, display: 'flex'})}>
        <button type="button" style={leftButtonStyle(value === 'myCar')} onClick={() => handleButtonClick('myCar')}>
          <Iconify icon="humbleicons:car" sx={{width: 30, height: 30, marginRight: '7px'}} />
          <div>マイカー</div>
        </button>
        <button type="button" style={rightButtonStyle(value === 'publicTransport')} onClick={() => handleButtonClick('publicTransport')}>
          <Iconify icon="material-symbols:train-outline" sx={{width: 30, height: 30, marginRight: '7px'}} />
          <div>その他</div>
        </button>
      </div>
    </Grid>
  );
}

const leftButtonStyle = (selected: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '30px',
  fontWeight: 'bold',
  fontSize: '16px',
  border: '2px solid #367B9D',
  marginLeft: '1.2rem',
  marginRight: '0rem',
  width: '100%',
  height: '43px',
  transition: 'background-color 0.3s ease-in-out',
  backgroundColor: selected ? '#367B9D' : '#fff',
  color: selected ? '#fff' : '#367B9D',
});

const rightButtonStyle = (selected: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '30px',
  fontWeight: 'bold',
  fontSize: '16px',
  border: '2px solid #367B9D',
  marginLeft: '0.5rem',
  marginRight: '1.2rem',

  width: '100%',
  height: '43px',
  transition: 'background-color 0.3s ease-in-out',
  backgroundColor: selected ? '#367B9D' : '#fff',
  color: selected ? '#fff' : '#367B9D',
});
