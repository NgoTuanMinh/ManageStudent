import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentForm from '../components/StudentForm';

function AddEditPage() {
    const { studentId } = useParams<{studentId: string}>()
    const [student, setStudent] = useState<Student>();
    const isEdit = Boolean(studentId);
    useEffect(() => {
        if (!studentId) return;
        (async function() {
            try {
                const studentGeted: Student = await studentApi.getById(studentId);
                setStudent(studentGeted)
            } catch (error) {
            }
        })();
    }, [studentId]);

    const handleSubmitForm = async (formValues: Student) => {
        console.log(formValues);
        if (isEdit) {
            await studentApi.update(formValues);
        } else {
            await studentApi.add(formValues);
        }
        toast.success('Save student successfully!');
    }

    const initialValues: Student = {
        name: '',
        mark: '',
        city: '',
        gender: 'male',
        age: '',
        ...student
    } as Student;

    return (
        <Box>
            <Link to="/admin/students">
                <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
                <ChevronLeft /> Back to student list
                </Typography>
            </Link>

            <Typography variant="h4">{isEdit ? 'Update student info' : 'Add new student'}</Typography>

            {(!isEdit || Boolean(student)) && (
                <Box mt={3}>
                    <StudentForm initialValues={initialValues} onSubmit={handleSubmitForm} />
                </Box>
            )}
        </Box>
    );
}

export default AddEditPage;