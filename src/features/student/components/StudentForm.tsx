import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioGroupField, SelectField } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

export interface StudentFormProps {
    initialValues?: Student,
    onSubmit:(formValues: Student) => void 
}


const schema = yup.object().shape({
    name: yup
      .string()
      .required('Please enter name.')
      .test('two-words', 'Please enter at least two words', (value) => {
        if (!value) return true;
  
        const parts = value?.split(' ') || [];
        return parts.filter((x) => Boolean(x)).length >= 2;
      }),
    age: yup
      .number()
      .positive('Please enter a positive number.')
      .min(18, 'Min is 18')
      .max(60, 'Max is 60')
      .integer('Please enter an integer.')
      .required('Please enter age.')
      .typeError('Please enter a valid number.'),
    mark: yup
      .number()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required('Please enter mark.')
      .typeError('Please enter a valid number.'),
    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female.')
      .required('Please select gender.'),
    city: yup.string().required('Please select city.'),
  });

export default function StudentForm({initialValues, onSubmit}: StudentFormProps) {

    const {control, handleSubmit, formState: { isSubmitting }} = useForm<Student>({
        defaultValues: initialValues,
        resolver: yupResolver(schema)
    })
    const [error, setError] = useState<string>('');

    const handleSubmitForm = async (formValues: Student) => {
        try {
            setError('');
            await onSubmit?.(formValues);
        } catch (error) {
            setError(error.message);
            toast.error('Submit failed. Try again');
        }
    }

    const cityOptions = useAppSelector(selectCityOptions);

    const genderOptions = [
        { label: "Male", value: 'male' },
        { label: 'Female', value: 'female'}]

    return (
        <Box maxWidth={480} margin={"0 auto"}>
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField name="name" control={control} label="Name"/>
                <InputField name="age" control={control} label="Age" type="number"/>
                <InputField name="mark" control={control} label="Mark" type="number"/>

                <RadioGroupField name="gender" control={control} label="Gender" options={genderOptions}/>

                <SelectField name="city" control={control} label="City" options={cityOptions} />

                {error && <Alert severity="error">{error}</Alert>}

                <Button type="submit" variant="contained" disabled={isSubmitting}>
                {isSubmitting && <CircularProgress size={16} color='primary'/>}    Submit
                </Button>
            </form>
        </Box>
    );
}
