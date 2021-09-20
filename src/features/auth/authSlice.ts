import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "models/user";

export interface AuthState {
    isLoggedIn: boolean;
    logging: boolean;
    currentUser?: User;
}

export interface LoginPayload {
    username: string;
    password: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            console.log("login");
            state.logging = true;
        },
        loginSuccess(state, action: PayloadAction<User>) {
            console.log("loginSuccess");
            state.logging = false;
            state.currentUser = action.payload;
        },
        loginFailed(state, action: PayloadAction<string>) {
            console.log("loginFailed");
            state.logging = false;
        },
        logout(state) {
            console.log("logout");
            state.isLoggedIn = false;
            state.currentUser = undefined;
        }
    }
})
// Action
export const authActions = authSlice.actions; 

// Selector
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
