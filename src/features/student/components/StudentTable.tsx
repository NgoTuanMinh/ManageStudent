import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { City, Student } from 'models';
import * as React from 'react';
import { useState } from 'react';
import { formatColorMark, formatGender } from 'utils/common';


export interface StudentTableProps {
    studentList: Student[],
    cityMap: {[key: string]: City},
    onEdit?: (student: Student) => void,
    onRemove?: (student: Student) => void,
}

const useStyles = makeStyles((theme) => ({
    root: {

    },
    table: {
        border: "none"
    },
    editButton: {
        marginRight: theme.spacing(2)
    }
}))

export default function StudentTable({ studentList, onEdit, onRemove, cityMap }: StudentTableProps) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student>();

    const handleRemoveClick = (student: Student) => {
        setOpen(true);
        setSelectedStudent(student);
    }

    const handleRemove = (student?: Student) => {
        if (student) {
            onRemove?.(student);
        }
        setOpen(false);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div>
            <TableContainer>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Mark</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {studentList.map((student, index) => (
                        <TableRow key={student.id} >
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{student.name}</TableCell>
                            <TableCell>{formatGender(student.gender)}</TableCell>
                            <TableCell> <Box color={formatColorMark(student?.mark)}>{student.mark}</Box></TableCell>
                            <TableCell>{ cityMap ? cityMap[student.city]?.name : student.city}</TableCell>
                            <TableCell align="right">
                                <Button className={classes.editButton} variant='outlined' color='primary' onClick={() => onEdit?.(student)}>Edit</Button>
                                <Button variant='outlined' color='secondary' onClick={() => handleRemoveClick(student)}>Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm remove student</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Do you want to remove {selectedStudent?.name}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancle
                </Button>
                <Button onClick={() => handleRemove(selectedStudent)} color="secondary" autoFocus>
                    Remove
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
