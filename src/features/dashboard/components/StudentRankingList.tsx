import { makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'models';
import * as React from 'react';

export interface StudentRankingListProps {
    studentList: Student[]
}

const useStyles = makeStyles((theme) => ({
    root: {

    },
    table: {
        border: "none"
    }
}))

export default function StudentRankingList({ studentList }: StudentRankingListProps) {
    const classes = useStyles();

    return (
        <TableContainer>
            <Table className={classes.table} size="small" aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">#</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="right">Mark</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {studentList.map((student, index) => (
                    <TableRow key={student.id} >
                        <TableCell>{index+1}</TableCell>
                        <TableCell align="left">{student.name}</TableCell>
                        <TableCell align="right">{student.mark}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
