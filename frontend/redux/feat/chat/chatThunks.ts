import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
import CreateGroupConversion from "Frontend/generated/com/hillarocket/application/dto/CreateGroupConversion";

export const ChatThunks = {
    getConversationByUserIds: createAsyncThunk("chat/get-conversation", ({u1, u2}: { u1: string, u2: string }) => {
        return ChatEndpoint.getSingleConversationByUserId(u1, u2);
    }),
    getConversationByUserId: createAsyncThunk("chat/get-conversation-by-user-id", (userId: string) => {
        return ChatEndpoint.getConversationByUserId(userId);
    }),
    getCurrentConversation: createAsyncThunk("chat/get-current-conversation", (id: string) => {
        return ChatEndpoint.getConversationById(id)
    }),
    getConversation: createAsyncThunk("chat/get-conversation-by-id", (conversationId: string) => {
        return ChatEndpoint.getConversationById(conversationId);
    }),
    getAllConversation: createAsyncThunk("auth/get-all-conversations", async () => {
        return UserEndpoint.findAll();
    }),
    createConversation: createAsyncThunk("chat/create-conversation", (createConversation: CreateGroupConversion) => {
        return ChatEndpoint.createConversation(createConversation);
    })

}

