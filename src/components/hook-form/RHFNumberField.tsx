import {useFormContext, Controller} from 'react-hook-form';
import {InputAdornment, TextField, TextFieldProps} from '@mui/material';

type Props = TextFieldProps & {
  name: string;
  unit?: string;
};

export default function RHFNumberField({name, helperText, unit, ...other}: Props) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          {...field}
          type="number"
          fullWidth
          value={!field.value ? '' : field.value}
          error={!!error}
          helperText={error ? error.message : helperText}
          onChange={(e) => {
            field.onChange(!e.target.value ? '' : e.target.value);
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">{unit}</InputAdornment>,
          }}
          {...other}
        />
      )}
    />
  );
}
