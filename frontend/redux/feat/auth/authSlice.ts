import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";

export type AuthState = {
    user: User | null,
    error: boolean,
    loading: boolean,
    users: User[],
}
const initialState: AuthState = {
    user: null,
    users: [],
    error: false,
    loading: false,
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<User>) {
            state.user = action.payload
        }
    },
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