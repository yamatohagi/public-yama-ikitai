import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {Controller, useFormContext} from 'react-hook-form';
import cuid from 'cuid';

const filter = createFilterOptions<FilmOptionType>();

export default function RHFAutocompleteAddItem({
  name,
  label,
  options,
  setDialogValue,
}: {
  name: string;
  label: string;
  options: {value: string; label: string}[];
  setDialogValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <Autocomplete
          {...field}
          value={field.value}
          onChange={(event, newValue) => {
            if (newValue && newValue.inputValue) {
              setDialogValue(newValue.inputValue);
            } else {
              field.onChange(newValue ? newValue.value : '');
            }
          }}
          // eslint-disable-next-line @typescript-eslint/no-shadow
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                label: `Add "${params.inputValue}"`,
                value: cuid(),
              });
            }

            return filtered;
          }}
          options={options}
          getOptionLabel={(option) => {
            if (typeof option === 'object' && option.label) {
              return option.label;
            }
            if (typeof option === 'string') {
              const matchingOption = options.find((opt) => opt.value === option);
              return matchingOption ? matchingOption.label : '';
            }
            return '';
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => (
            <li {...props} key={option.value}>
              {option.label}
            </li>
          )}
          freeSolo
          renderInput={(params) => <TextField {...params} label={label} error={!!error} helperText={error?.message} />}
        />
      )}
    />
  );
}

interface FilmOptionType {
  inputValue?: string;
  value?: string | number;
  label: string;
}
