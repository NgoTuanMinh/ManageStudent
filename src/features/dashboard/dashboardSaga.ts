import cityApi from "api/cityApi";
import studentApi from "api/studentApi";
import { City, ListResponse, Student } from "models";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function* fetchStatistics() {
    const responseList : Array<ListResponse<Student>> = yield all([
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            gender: "male"
        }),
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            gender: "female"
        }),
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            mark_gte: 8
        }),
        call(studentApi.getAll, {
            _page: 1,
            _limit: 1,
            mark_lte: 5
        }),
    ])
    const statisticsList = responseList.map((statictis, index) => statictis.pagination._totalRows);
    const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;
    yield put(dashboardActions.setStatistics({maleCount, femaleCount, highMarkCount, lowMarkCount}));
}

function* fetchHighestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: "mark",
        _order: "desc"
    })
    yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
    const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
        _page: 1,
        _limit: 5,
        _sort: "mark",
        _order: "asc"
    })
    yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
    // fetch city list
    const cityList: City[] = yield call(cityApi.getAll);
    
    // fetch ranking by city
    const callList = cityList.map((cityObj) => call(studentApi.getAll, {_page: 1, _limit: 5, _sort: 'mark', _order: 'desc', city: cityObj.code}));
    const responseList: Array<ListResponse<Student>> = yield all(callList);
    const rankingByCityList: Array<RankingByCity> = responseList.map((responseList, index) => ({
        cityId: cityList[index].code,
        cityName: cityList[index].name,
        rankingList: responseList.data
    }))
    
    // set state
    yield put(dashboardActions.setRankingByCityList(rankingByCityList))
}

function* fetchDashboardData() {
    try {
        yield all([ 
            call(fetchStatistics), 
            call(fetchHighestStudentList), 
            call(fetchLowestStudentList), 
            call(fetchRankingByCityList)])
        yield put(dashboardActions.fetchDataSuccess());
    } catch (error) {
        yield put(dashboardActions.fetchDataFailed());
    }
}

export default function* dashboardSaga() {
    yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData);
}