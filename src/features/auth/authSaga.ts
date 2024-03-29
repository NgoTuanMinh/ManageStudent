import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
    try {
        yield delay(1000);
        localStorage.setItem("access_token", "hellooo")
        yield put(authActions.loginSuccess({
            id: 1,
            name: "Minh Dz"
        }))
        yield put(push("/admin/dashboard"));
    } catch (error) {
        yield put(authActions.loginFailed(error.message));
    }
}

function* handleLogout() {
    localStorage.removeItem("access_token")
    yield put(push("/login"));
}

function* watchLoginFlow() {
    while(true) {
        const isLoggedIn = Boolean(localStorage.getItem("access_token"));
        if (!isLoggedIn) {
            const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
            yield fork(handleLogin, action.payload);
        }

    
        yield take(authActions.logout.type);
        yield call(handleLogout)
    }
}

export default function* authSaga() {
    yield fork(watchLoginFlow);
}