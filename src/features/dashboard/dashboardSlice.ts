import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { Student } from "models";

export interface Statistics {
    femaleCount: number;
    maleCount: number;
    highMarkCount: number;
    lowMarkCount: number;
}

export interface RankingByCity {
    cityId: string;
    cityName: string;
    rankingList: Student[];
}

export interface DashboardState {
    loading: boolean;
    statistics: Statistics;
    highestStudentList: Student[]; 
    lowestStudentList: Student[]; 
    rankingByCityList: RankingByCity[];
}

const statisticsState: Statistics = {
    femaleCount: 0,
    maleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
}

const initialState: DashboardState = {
    loading: false,
    statistics: statisticsState,
    highestStudentList: [], 
    lowestStudentList: [],
    rankingByCityList: []
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        fetchData(state, action: PayloadAction) {
            state.loading = true;
        },
        fetchDataSuccess(state, action: PayloadAction) {
            state.loading = false;
        },
        fetchDataFailed(state, action: PayloadAction) {
            state.loading = false;
        },
        setStatistics(state, action: PayloadAction<Statistics>) {
            state.statistics = action.payload;
        },
        setHighestStudentList(state, action: PayloadAction<Array<Student>>) {
            state.highestStudentList = action.payload;
        },
        setLowestStudentList(state, action: PayloadAction<Array<Student>>) {
            state.lowestStudentList = action.payload;
        },
        setRankingByCityList(state, action: PayloadAction<Array<RankingByCity>>) {
            state.rankingByCityList = action.payload;
        },
    }
})
// Action
export const dashboardActions = dashboardSlice.actions; 

// Selector
export const selectLoading = (state: RootState) => state.dashboard.loading;
export const selectStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

// Reducers
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
