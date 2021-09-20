import { all } from "@redux-saga/core/effects";
import authSaga from "features/auth/authSaga";
import citySaga from "features/city/citySaga";
import dashboardSaga from "features/dashboard/dashboardSaga";
import studentSaga from "features/student/studentSaga";
import counterSaga from "./counterSaga";

export default function* rootSaga() {
    yield all([authSaga(), counterSaga(), dashboardSaga(), studentSaga(), citySaga()])
}