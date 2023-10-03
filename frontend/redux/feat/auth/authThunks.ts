import {createAsyncThunk} from "@reduxjs/toolkit";
import {logout} from "@hilla/frontend"
import {UserEndpoint} from "Frontend/generated/endpoints";
import {Socket} from "Frontend/redux/socket";
import {startListener} from "Frontend/redux/listeners";


export const AuthThunks = {
    logout: createAsyncThunk("auth/logout", async () => {
        return logout();
    }),
    getUser: createAsyncThunk("auth/get-user", async () => {
        return UserEndpoint.getAuthenticatedUser();
    }),
    startConnection: createAsyncThunk("auth/start-connection", async (userId:string) =>{
        const socket = new Socket(userId);
        startListener(socket);
    }),
    
}

