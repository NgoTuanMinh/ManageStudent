import { takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { incrementBySaga, incrementBySagaSuccess } from "features/counter/counterSlice";
import { delay, put } from 'redux-saga/effects';

function* handleIncrement(action: PayloadAction<number>) {
    yield delay(1000);
    yield put(incrementBySagaSuccess(action.payload));
}

export default function* counterSaga() {
    yield takeLatest(incrementBySaga.toString(), handleIncrement)
}