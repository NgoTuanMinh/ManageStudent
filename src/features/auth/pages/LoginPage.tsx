import { makeStyles, Paper, Typography, Box, Button, CircularProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { authActions } from '../authSlice';


export interface LoginPageProps {

}

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh"
    },
    box: {
        padding: theme.spacing(2)
    }
}))

function LoginPage(props: LoginPageProps) {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const islogging = useAppSelector((state) => state.auth.logging);
    const handleLoginClick = () => {
        dispatch(
            authActions.login({
                username: '',
                password: '',
            })
        )
    }

    return (
        <div className={classes.root}>
            <Paper elevation={1} className={classes.box}>
                <Typography variant="h5" component="h1">
                    Student Management
                </Typography>
                <Box mt={4}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}> {islogging && <CircularProgress size={20} color="secondary" />}  Fake Login </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default LoginPage;