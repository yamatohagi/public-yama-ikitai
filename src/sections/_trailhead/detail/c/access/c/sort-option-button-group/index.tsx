import {css} from 'styled-system/css';
import {Grid} from '@mui/material';
import {atom, useAtom} from 'jotai';

type SortOptionButtonGroupProps = {
  title?: string;
};

export const SortOptionButtonGroupValueAtom = atom<'fastest' | 'cheapest' | 'fewestTransfers'>('fastest');
export default function SortOptionButtonGroup({title}: SortOptionButtonGroupProps) {
  const [value, setValue] = useAtom(SortOptionButtonGroupValueAtom);

  return (
    <Grid item xs={12} sm={12}>
      <div className={css({mb: 3, display: 'flex', width: '100%'})}>
        <button type="button" style={leftButtonStyle(value === 'fastest')} onClick={() => setValue('fastest')}>
          早い順
        </button>
        <button type="button" style={centerButtonStyle(value === 'cheapest')} onClick={() => setValue('cheapest')}>
          安い順
        </button>
        <button type="button" style={rightButtonStyle(value === 'fewestTransfers')} onClick={() => setValue('fewestTransfers')}>
          乗換回数
        </button>
      </div>
    </Grid>
  );
}

const leftButtonStyle = (selected: boolean): React.CSSProperties => ({
  fontWeight: 'bold',
  width: '33%',
  marginLeft: '1rem',
  borderRadius: '7px 0 0 7px',
  padding: '10px 15px',
  border: '2px solid #367B9D',
  borderRight: 'none',
  backgroundColor: selected ? '#367B9D' : '#fff',
  color: selected ? '#fff' : '#367B9D',
});

const centerButtonStyle = (selected: boolean): React.CSSProperties => ({
  fontWeight: 'bold',
  width: '33%',
  borderRadius: '0',
  padding: '10px 15px',
  border: '2px solid #367B9D',
  backgroundColor: selected ? '#367B9D' : '#fff',
  color: selected ? '#fff' : '#367B9D',
});

const rightButtonStyle = (selected: boolean): React.CSSProperties => ({
  fontWeight: 'bold',
  width: '33%',
  marginRight: '1rem',
  borderRadius: '0 7px 7px 0',
  padding: '10px 15px',
  border: '2px solid #367B9D',
  borderLeft: 'none',
  backgroundColor: selected ? '#367B9D' : '#fff',
  color: selected ? '#fff' : '#367B9D',
});
