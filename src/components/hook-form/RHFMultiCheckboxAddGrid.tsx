import { useFormContext, Controller } from 'react-hook-form';
import {
  Checkbox,
  FormLabel,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Grid,
} from '@mui/material';

// ここに RHFCheckbox のコード...

export function RHFMultiCheckboxAddGrid({
  row,
  name,
  label,
  options,
  spacing,
  helperText,
  ...other
}: any) {
  const { control } = useFormContext();

  const getSelected = (selectedItems: any, item: any) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value: any) => value !== item)
      : [...selectedItems, item];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl component="fieldset">
          {label && (
            <FormLabel component="legend" sx={{ typography: 'body2' }}>
              {label}
            </FormLabel>
          )}

          <Grid
            container
            spacing={spacing}
            direction="row"
            sx={{
              '& .MuiFormControlLabel-root': {
                ...(row && {
                  mr: 0,
                  '&:not(:last-of-type)': {
                    mr: spacing || 2,
                  },
                }),
              },
            }}
          >
            {options.map((option: any) => (
              <Grid item xs={6} key={option.value}>
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={field.value.includes(option.value)}
                      onChange={() => field.onChange(getSelected(field.value, option.value))}
                    />
                  }
                  label={option.label}
                  {...other}
                />
              </Grid>
            ))}
          </Grid>

          {(!!error || helperText) && (
            <FormHelperText error={!!error} sx={{ mx: 0 }}>
              {error ? error?.message : helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
