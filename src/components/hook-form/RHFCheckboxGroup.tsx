import React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import {Box, FormControlLabel, Checkbox, FormGroup, FormControl, FormLabel, FormHelperText, TypographyProps} from '@mui/material';

interface Option {
  value: string | number;
  label: string;
}

interface RHFCheckboxGroupProps {
  name: string;
  label?: string;
  options: Option[];
  componentsProps?: {
    /**
     * Props applied to the Typography wrapper of the passed label.
     * This is unused if disableTpography is true.
     * @default {}
     */
    typography?: TypographyProps;
  };
}

const RHFCheckboxGroup: React.FC<RHFCheckboxGroupProps> = ({name, label, options, componentsProps}) => {
  const {control} = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={[]}
      render={({field, fieldState: {error}}) => (
        <FormControl component="fieldset" focused={!!error} error={!!error}>
          <Box display="flex" alignItems="center">
            {label && <FormLabel component="legend">{label}</FormLabel>}
            <FormHelperText>{error?.message}</FormHelperText>
          </Box>
          <FormGroup row>
            {options.map((option: Option, i: number) => (
              <FormControlLabel
                key={i}
                value={option.value}
                control={
                  <Checkbox
                    checked={field.value.includes(option.value)}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const newValue = e.target.checked
                        ? [...field.value, option.value]
                        : field.value.filter((value: string) => value !== option.value);
                      field.onChange(newValue);
                    }}
                  />
                }
                label={option.label}
                componentsProps={componentsProps}
              />
            ))}
          </FormGroup>
        </FormControl>
      )}
    />
  );
};

export default RHFCheckboxGroup;
