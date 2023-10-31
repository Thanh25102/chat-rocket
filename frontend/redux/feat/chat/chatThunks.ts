import {createAsyncThunk} from "@reduxjs/toolkit";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
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
    getConversationByUserIds:createAsyncThunk("chat/create-conversation",({u1,u2}:{u1:string,u2:string})=>{
       return ChatEndpoint.getSingleConversionByUserId(u1,u2);
    }),
    getConversation:createAsyncThunk("chat/get-conversation-by-id",(conversionId:string)=>{
        return ChatEndpoint.getConversionById(conversionId);
    }),
    getAllConversation: createAsyncThunk("auth/get-all-conversations", async () => {
        return UserEndpoint.findAll();
    }),

}

