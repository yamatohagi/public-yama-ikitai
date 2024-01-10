// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import TextField from '@mui/material/TextField';
import type {TextFieldProps} from '@mui/material';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({name, helperText, type = 'text', ...other}: Props) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          {...field}
          fullWidth
          value={!field.value || (typeof field.value === 'number' && field.value === 0) ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
          {...(type === 'number' ? {inputMode: 'numeric', type: 'tel'} : {})}
          inputMode="numeric"
        />
      )}
    />
  );
}
