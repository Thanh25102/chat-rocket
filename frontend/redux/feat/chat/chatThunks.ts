import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
import {Client} from "stompjs";
import {formMessagesSender} from "Frontend/utils/converter";
import MessageSender from "Frontend/generated/com/hillarocket/application/dto/MessageSender";

interface ChatThunkApiConfig {
    extra: {
        io: Client | undefined;
    };
}

export const ChatThunks = {
    sendMessage: createAsyncThunk<any, any, ChatThunkApiConfig>(
        "auth/send-message",
        async (message: MessageSender, thunkApi) => {
            await thunkApi.extra.io?.send("/rocket/private-message", {}, JSON.stringify(message))
            return formMessagesSender([message]);
        },
    ),
    getConversationByUserIds: createAsyncThunk("chat/create-conversation", ({u1, u2}: { u1: string, u2: string }) => {
        return ChatEndpoint.getSingleConversationByUserId(u1, u2);
    }),
    getConversation: createAsyncThunk("chat/get-conversation-by-id", (conversationId: string) => {
        return ChatEndpoint.getConversationById(conversationId);
    }),
    getAllConversation: createAsyncThunk("auth/get-all-conversations", async () => {
        return UserEndpoint.findAll();
    }),

}

