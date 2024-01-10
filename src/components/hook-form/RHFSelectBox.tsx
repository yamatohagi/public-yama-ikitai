// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {MenuItem, TextField, TextFieldProps} from '@mui/material';

type RHFSelectBoxProps = TextFieldProps & {
  options: any[];
  name: string;
  nullable?: boolean;
};
export default function RHFSelectBox({options, name, nullable = true, ...other}: RHFSelectBoxProps) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          {...field}
          select
          fullWidth
          value={!field.value || (typeof field.value === 'number' && field.value === 0) ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {nullable && <MenuItem value={undefined}>選択してください</MenuItem>}

          {options.map((obj: any, i: any) => (
            <MenuItem key={i} value={obj.value}>
              {obj.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
}
