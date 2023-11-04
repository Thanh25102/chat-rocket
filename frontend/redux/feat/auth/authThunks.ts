import {createAsyncThunk} from "@reduxjs/toolkit";
import {logout} from "@hilla/frontend"
import {UserEndpoint} from "Frontend/generated/endpoints";
import {io} from "Frontend/redux/socket";
import {Client} from "stompjs";

interface ChatThunkApiConfig {
    extra: {
        io: Client | undefined;
    };
}

export const AuthThunks = {
    logout: createAsyncThunk<any, any, ChatThunkApiConfig>("auth/logout", async (thunkApi) => {
        return logout().then(() => thunkApi.extra.io.disconnect(() => console.log("disconnect socket .... logged out ....")));
    }),
    getUser: createAsyncThunk("auth/get-user", async () => {
        return UserEndpoint.getAuthenticatedUser();
    }),
    getAllUsers: createAsyncThunk("auth/get-all-users", async () => {
        return UserEndpoint.findAll();
    }),
    startConnection: createAsyncThunk<any, any, ChatThunkApiConfig>("auth/start-connection",
        async ({userId, dispatch}: { userId: string, dispatch: any }, thunkApi) => {
            thunkApi.extra.io = io(userId, dispatch);
            return thunkApi.extra.io;
        }
    ),
}

