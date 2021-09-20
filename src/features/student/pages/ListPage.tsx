import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import studentApi from 'api/studentApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCityList, selectCityMap } from 'features/city/citySlice';
import { ListParams, Student } from 'models';
import React, { ChangeEvent, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentFilters from '../components/StudentFilters';
import StudentTable from '../components/StudentTable';
import { selectFilter, selectList, selectPagination, studentActions } from '../studentSlice';

const useStyles = makeStyles((theme) =>({
    root: {

    },
    titleContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginBottom: theme.spacing(4)
    }
}))

function ListPage() {

    const classes = useStyles();

    const dispatch = useAppDispatch();
    const listStudent = useAppSelector(selectList);
    const filter = useAppSelector(selectFilter);
    const pagination = useAppSelector(selectPagination);
    const cityMap = useAppSelector(selectCityMap);
    const cityList = useAppSelector(selectCityList);
    const history = useHistory();


    useEffect(() => {
        dispatch(studentActions.fetchStudentList(filter))
    }, [dispatch, filter])

    const handlePagination = ((event: ChangeEvent<unknown>,value: number) => {
        dispatch(studentActions.setFilter({
            ...filter,
            _page: value
        }))
    })


    const onSearchChange = (newFilter: ListParams) => {
        dispatch(studentActions.setFilterWithDebounce(newFilter));
    }

    const onChangeFilter = (newFilter: ListParams) => {
        dispatch(studentActions.setFilter(newFilter));
    }

    const handleRemoveStudent = async (student: Student) => {
        await studentApi.remove(student.id as string);
        dispatch(studentActions.setFilter({...filter}));
        toast.success('Remove student successfully.')
    }

    const handleEditStudent = (student: Student) => {
        history.push(`/admin/students/${student.id}`)
    }

    return (
       <Box className={classes.root}>
           {/* Title */}
            <Box className={classes.titleContainer}>
                <Typography variant="h4" >Students</Typography>
                <Link to="/admin/students/add">
                    <Button variant="contained" color="primary">
                        Add new student
                    </Button>
                </Link>
            </Box>

           {/* Filter */}
            <StudentFilters filter={filter} cityList={cityList} onChange={onChangeFilter} onSearchChange={onSearchChange}/>

            {/* Student Table */}
            <StudentTable studentList={listStudent} onRemove={handleRemoveStudent} onEdit={handleEditStudent} cityMap={cityMap}/>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" marginTop={2}>
                <Pagination count={Math.ceil(pagination._totalRows/pagination._limit)} variant="outlined" color="primary" onChange={handlePagination}/>
            </Box>
       </Box>
    );
}

export default ListPage;