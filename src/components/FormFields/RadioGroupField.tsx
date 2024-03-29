import { FormControl, FormHelperText, FormLabel } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioGroupFieldProps{
    name: string,
    control: Control<any>,
    label: string,
    disabled?: boolean,
    options: Array<{label: string, value: string | number}>
}

export function RadioGroupField({name, control, label, disabled, options}: RadioGroupFieldProps) {
    const { field: {value, onChange, onBlur},
            fieldState: {invalid, error}} 
        = useController({name, control});
    return (
            <FormControl component="fieldset" size="small" error={invalid} margin="normal">
                <FormLabel component="legend">{label}</FormLabel>
                
                <RadioGroup name={name} value={value} onChange={onChange} onBlur={onBlur}>
                    {options.map((option, index) => <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />)}
                </RadioGroup>

                <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
    );
}
