import * as React from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField, {TextFieldProps} from '@mui/material/TextField';

type RHFMultiSelectProps = TextFieldProps & {
  name: string;
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
  }[];
  textFieldProps?: TextFieldProps;
};

export function RHFMultiSelect({name, label, options, placeholder, textFieldProps, ...other}: RHFMultiSelectProps) {
  const {control} = useFormContext();

  const getLabelsFromValues = (values: string[]) => values.map((value) => options.find((option) => option.value === value)?.label || '');

  const getValuesFromLabels = (labels: string[]) => labels.map((label) => options.find((option) => option.label === label)?.value || '');

  return (
    <Controller
      // もしvalueがundefinedならdefaultValueを設定する
      defaultValue={control._defaultValues.current?.[name] || []}
      name={name}
      control={control}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <Box sx={{width: '100%'}}>
          <Autocomplete
            multiple
            options={options.map((option) => option.label)}
            value={getLabelsFromValues(value)}
            onChange={(_, newLabels) => {
              onChange(getValuesFromLabels(newLabels));
            }}
            isOptionEqualToValue={(option, value) => option === value}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderTags={(selected: string[], getTagProps) =>
              selected.map((option: string, index: number) => (
                <Chip
                  label={option}
                  {...getTagProps({index})}
                  onDelete={() => {
                    const newValues = [...value];
                    newValues.splice(index, 1);
                    onChange(newValues);
                  }}
                  onMouseDown={(event) => event.stopPropagation()}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                label={label}
                placeholder={placeholder}
                error={!!error}
                helperText={error ? error.message : ''}
                {...textFieldProps}
                {...other}
              />
            )}
          />
        </Box>
      )}
    />
  );
}
