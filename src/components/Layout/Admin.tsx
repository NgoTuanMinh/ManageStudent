import { Box, makeStyles } from '@material-ui/core';
import Dashboard from 'features/dashboard';
import Student from 'features/student';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header, Sidebar } from '../Comman'


const useStyles = makeStyles((theme) => ({
    root: {
        display: "grid",
        gridTemplateRows: "auto 1fr",
        gridTemplateColumns: "240px 1fr",
        gridTemplateAreas: `"header header" "sidebar main"`,

        minHeight: "100vh"
    },

    header: {
        gridArea: "header"
    },

    sidebar: {
        gridArea: "sidebar",
        borderRight: `1px solid ${theme.palette.divider}`
    },

    main: {
        gridArea: "main"
    }

}))

function Admin() {
    const classes = useStyles();
    return (
       <Box className={classes.root}>
           <Box className={classes.header}> <Header/> </Box>
           <Box className={classes.sidebar}> <Sidebar/> </Box>
           <Box className={classes.main}>
               <Switch>
                   <Route path="/admin/dashboard"> <Dashboard/> </Route>
                   <Route path="/admin/students"> <Student/> </Route>
               </Switch>
           </Box>
       </Box>
    );
}

export default Admin;