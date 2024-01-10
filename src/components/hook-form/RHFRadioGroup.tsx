// form
import {useFormContext, Controller} from 'react-hook-form';
// @mui
import {Radio, FormLabel, RadioGroup, FormControl, FormHelperText, RadioGroupProps, FormControlLabel, SxProps, Box} from '@mui/material';

type Props = RadioGroupProps & {
  name: string;
  options: {label: string; value: any}[];
  label?: string;
  spacing?: number;
  helperText?: React.ReactNode;
  labelSx?: SxProps;
  boxSx?: SxProps;
  radioGroupSx?: SxProps;
};

export default function RHFRadioGroup({row, name, label, options, spacing, helperText, labelSx, boxSx, radioGroupSx, ...other}: Props) {
  const {control} = useFormContext();

  const labelledby = label ? `${name}-${label}` : '';

  return (
    <Controller
      // client.js:1 MUI: A component is changingのエラーが出るのでdefaultValueを設定
      defaultValue={options[0].value}
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <Box sx={boxSx}>
          <FormControl component="fieldset">
            {label && (
              <FormLabel component="legend" id={labelledby} sx={{typography: 'body2', ...labelSx, color: '#323232'}}>
                {label}
              </FormLabel>
            )}

            <RadioGroup
              sx={radioGroupSx}
              {...field}
              aria-labelledby={labelledby}
              row={row}
              onChange={(e) => {
                if (e.target.value === 'true' || e.target.value === 'false') {
                  field.onChange(e.target.value === 'true');
                } else {
                  field.onChange(e.target.value);
                }
              }}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio checked={option.value === field.value} />}
                  label={option.label}
                  sx={{
                    '&:not(:last-of-type)': {
                      mb: spacing || 0,
                    },
                    ...(row && {
                      mr: 0,
                      '&:not(:last-of-type)': {
                        mr: spacing || 2,
                      },
                    }),
                  }}
                />
              ))}
            </RadioGroup>

            {(!!error || helperText) && (
              <FormHelperText error={!!error} sx={{mx: 0}}>
                {error ? error?.message : helperText}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
}
