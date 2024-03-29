import { PayloadAction } from "@reduxjs/toolkit";
import studentApi from "api/studentApi";
import { ListParams, ListResponse, Student } from "models";
import { put, takeLatest, call, debounce } from "redux-saga/effects";
import { studentActions } from "./studentSlice";

function* fetchStudentList(action: PayloadAction<ListParams>) {
    try {
        
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload)

        yield put(studentActions.fetchStudentListSuccess(response));
    } catch (error) {
        yield put(studentActions.fetchStudentListFailed());
    }
}

function* handleSearchWithDebounce(action: PayloadAction<ListParams>) {
    yield put(studentActions.setFilter(action.payload));
}

export default function* studentSaga() {
    yield takeLatest(studentActions.fetchStudentList, fetchStudentList);
    yield debounce(500, studentActions.setFilterWithDebounce.type , handleSearchWithDebounce )
}