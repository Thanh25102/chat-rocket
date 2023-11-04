import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
import {Client} from "stompjs";

interface ChatThunkApiConfig {
    extra: {
        io: Client | undefined;
    };
}

export const ChatThunks = {
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

