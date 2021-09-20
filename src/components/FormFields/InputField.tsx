import { TextField } from '@material-ui/core';
import { default as React, InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    control: Control<any>,
    label: string
}

export function InputField({name, control, label, ...inputProps}: InputFieldProps) {
    const { field: {value, onChange, onBlur, ref},
            fieldState: {invalid, error}} 
        = useController({name, control});

    return (
        <TextField 
        name={name}
        label={label}
        fullWidth
        size="small"
        onBlur={onBlur}
        onChange={onChange}
        inputRef={ref}
        value={value}
        variant="outlined"
        error={invalid} 
        margin="normal"
        helperText={error?.messeage}
        inputProps={inputProps}
        />
    );
}
