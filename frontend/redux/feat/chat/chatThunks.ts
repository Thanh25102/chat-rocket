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

export const ChatThunks = {
    sendMessage: createAsyncThunk<any, any, ChatThunkApiConfig>(
        "auth/send-message",
        async (message: Message, thunkApi) => {
            thunkApi.extra.chatSocket?.send("/private-message", {}, JSON.stringify(message))
        },
    ),

}

