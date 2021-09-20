import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: theme.spacing(2),
        display: "flex",
        flexFlow: "row nowrap",
        justifyContent: "space-between"
    }
}))

export interface StatisticsItemProps {
    icon: React.ReactElement;
    label: string;
    value: string | number;
}

function StatisticsItem({icon, label, value}: StatisticsItemProps) {
    const classes = useStyles();

    return (
       <Paper className={classes.root}>
           <Box>{icon}</Box>
            <Box>
                <Typography variant="h5">{value}</Typography>
                <Typography variant="caption">{label}</Typography>
            </Box>
       </Paper>
    );
}

export default StatisticsItem;