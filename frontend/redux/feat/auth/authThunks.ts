import {createAsyncThunk} from "@reduxjs/toolkit";
import {logout} from "@hilla/frontend"
import {UserEndpoint} from "Frontend/generated/endpoints";
export const AuthThunks = {
    logout: createAsyncThunk("auth/logout", async (thunkApi) => {
        return logout()
    }),
    getUser: createAsyncThunk("auth/get-user", async () => {
        return UserEndpoint.getAuthenticatedUser();
    }),
    getAllUsers: createAsyncThunk("auth/get-all-users", async () => {
        return UserEndpoint.findAll();
    }),
}

