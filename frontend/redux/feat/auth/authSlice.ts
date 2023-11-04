import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {createSlice} from "@reduxjs/toolkit";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {Client} from "@stomp/stompjs";
import {io} from "Frontend/stomp";

export type AuthState = {
    user: User | null,
    stomp?: Client,
    error: boolean,
    loading: boolean,
    users: User[],
}
const initialState: AuthState = {
    user: null,
    stomp: undefined,
    users: [],
    error: false,
    loading: false,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AuthThunks.getUser.fulfilled, (state, action) => {
                state.user = action.payload || null
                state.error = false
                state.loading = false
            })
            .addCase(AuthThunks.getUser.rejected, (state) => {
                state.user = null
                state.error = true
                state.loading = false
            })
            .addCase(AuthThunks.getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(AuthThunks.getAllUsers.fulfilled, (state, action) => {
                state.users = action.payload || []
            })
        builder
            .addCase(AuthThunks.logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(AuthThunks.logout.fulfilled, (state) => {
                state.user = null
                state.error = false
                state.loading = false
            })
    },
});

export const AuthActions = authSlice.actions;