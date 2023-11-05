import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";

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

