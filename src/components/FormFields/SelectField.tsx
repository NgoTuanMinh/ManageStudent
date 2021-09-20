import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectFieldProps{
    name: string,
    control: Control<any>,
    label: string,
    disabled?: boolean,
    options: Array<{label: string, value: string | number}>
}

export function SelectField({name, control, label, disabled, options}: SelectFieldProps) {
    const { field: {value, onChange, onBlur},
            fieldState: {invalid, error}} 
        = useController({name, control});

    return (
        <FormControl variant="outlined" size="small" fullWidth error={invalid}>
            <InputLabel id="filter_by_city">{label}</InputLabel>

            <Select
            labelId="filter_by_city"
            id="demo-simple-select-outlined"
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label="Age">
                <MenuItem value=""> <em>All</em> </MenuItem>
                {options?.map((option, index) => <MenuItem key={index} value={option.value}>{option.label}</MenuItem>)}
            </Select>

            <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
    );
}
