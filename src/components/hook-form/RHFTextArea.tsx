// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {TextField, TextFieldProps} from '@mui/material';

type RHFTextAreaProps = TextFieldProps & {
  name: string;
  helperText?: string;
};
export default function RHFTextArea({name, helperText, ...other}: RHFTextAreaProps) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextField
          multiline
          rows={4}
          {...field}
          fullWidth
          value={!field.value || (typeof field.value === 'number' && field.value === 0) ? '' : field.value}
          error={!!error}
          helperText={error ? error?.message : helperText}
          {...other}
        />
      )}
    />
  );
}
