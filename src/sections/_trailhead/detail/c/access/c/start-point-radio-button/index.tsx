import {css} from 'styled-system/css';
import {Grid} from '@mui/material';
import {useEffect} from 'react';
import {atom, useAtom} from 'jotai';
import RadioButton from './c/custom-radio-button';

type StartPointRadioButtonProps = {
  title?: string;
};

export const StartPointRadioButtonOptionsAtom = atom<string[] | undefined>(undefined);
export const StartPointRadioButtonValueAtom = atom<string | undefined>('');

export default function StartPointRadioButton({title}: StartPointRadioButtonProps) {
  const [options] = useAtom(StartPointRadioButtonOptionsAtom);
  const [value, setValue] = useAtom(StartPointRadioButtonValueAtom);

  useEffect(() => {
    if (!options) return;
    setValue(options[0]);
  }, [options]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value as '東京' | '大阪');
  };

  return (
    <Grid item xs={12} sm={12}>
      <div
        className={css({
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          padding: '10px',
          border: '2px solid #367B9D',
          borderRadius: '7px',
          ml: '1rem',
          mr: '1rem',
          color: '#323232',
          fontWeight: 'semibold',
        })}
      >
        出発地点
        <div className={css({display: 'flex', ml: '30px'})}>
          {options &&
            value &&
            options.map((option, idx) => (
              <div key={idx}>
                <RadioButton option={option} idx={idx} value={value} handleChange={handleChange} />
              </div>
            ))}
        </div>
      </div>
    </Grid>
  );
}
