import { Box, Grid, LinearProgress, Typography } from '@material-ui/core';
import { ChatBubble, ChatRounded, LinearScaleSharp, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import StatisticsItem from './components/StatisticsItem';
import StudentRankingList from './components/StudentRankingList';
import Widget from './components/Widget';
import { dashboardActions, selectHighestStudentList, selectLoading, selectLowestStudentList, selectRankingByCityList, selectStatistics } from './dashboardSlice';


function Dashboard() {
    const dispatch = useAppDispatch();
    const loading = useAppSelector(selectLoading);
    const statistics = useAppSelector(selectStatistics);
    const highestStudentList = useAppSelector(selectHighestStudentList);
    const lowestStudentList = useAppSelector(selectLowestStudentList);
    const rankingByCityList = useAppSelector(selectRankingByCityList);

    useEffect(() => {
        dispatch(dashboardActions.fetchData())
    }, [dispatch]);

    return (
        <Box>
            {/* Loading */}
            {loading && <LinearProgress />}

            {/* Statistics */}
            <Grid container>
                <Grid item xs={12} md={3}>
                    <StatisticsItem icon={ <PeopleAlt fontSize="large" color="primary" /> } label="Male" value={statistics.maleCount}></StatisticsItem>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatisticsItem icon={ <ChatRounded fontSize="large" color="primary" /> } label="Female" value={statistics.femaleCount}></StatisticsItem>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatisticsItem icon={ <ChatBubble fontSize="large" color="primary" /> } label="Highmark" value={statistics.highMarkCount}></StatisticsItem>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StatisticsItem icon={ <LinearScaleSharp fontSize="large" color="primary" /> } label="Lowmark" value={statistics.lowMarkCount}></StatisticsItem>
                </Grid>
            </Grid>
        
            {/* All Student rankings */}
            <Box mt={4}>
                <Box ml={2}><Typography variant="h4">All students</Typography></Box>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <Widget title="Student with highest mark">
                            <StudentRankingList studentList={highestStudentList}/>
                        </Widget>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Widget title="Student with lowest mark">
                            <StudentRankingList studentList={lowestStudentList}/>
                        </Widget>
                    </Grid>
                </Grid>
            </Box>

            {/* Ranking by city list */}
            <Box mt={4}>
                <Box ml={2}><Typography variant="h4">Ranking by city list</Typography></Box>
                <Grid container>
                    {rankingByCityList.map((listStudent, index) => <Grid key={index} item xs={12} md={3}>
                        <Widget title={listStudent.cityName}>
                            <StudentRankingList studentList={listStudent.rankingList}/>
                        </Widget>
                    </Grid>)}
                </Grid>
            </Box>

        </Box>)
}

export default Dashboard;