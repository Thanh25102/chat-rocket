import {createAsyncThunk} from "@reduxjs/toolkit";
import {logout} from "@hilla/frontend"
import {UserEndpoint} from "Frontend/generated/endpoints";
import {Socket} from "Frontend/redux/socket";
import Message from "Frontend/generated/com/hillarocket/application/domain/Message";
import {Client} from "stompjs";

interface ChatThunkApiConfig {
    extra: {
        chatSocket: Client | undefined;
    };
}

export const AuthThunks = {
    logout: createAsyncThunk<any, any, ChatThunkApiConfig>("auth/logout", async (thunkApi) => {
        return logout().then(() => thunkApi.extra.chatSocket.disconnect(() => console.log("disconnect socket .... logged out ....")));
    }),
    getUser: createAsyncThunk("auth/get-user", async () => {
        return UserEndpoint.getAuthenticatedUser();
    }),
    getAllUsers: createAsyncThunk("auth/get-all-users", async () => {
        return UserEndpoint.findAll();
    }),
    startConnection: createAsyncThunk<any, any, ChatThunkApiConfig>("auth/start-connection", async (userId: string, thunkApi) => {
        const socket = new Socket(userId);
        thunkApi.extra.chatSocket = socket.stomp;
        return thunkApi.extra.chatSocket;
    }),
}

