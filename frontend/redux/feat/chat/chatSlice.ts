import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {createSlice} from "@reduxjs/toolkit";
import Message from "Frontend/generated/com/hillarocket/application/domain/Message";

export type ChatState = {
    error: boolean,
    loading: boolean,
    conversations: { conversationId: string, messages: Message[] }[],
}
const initialState: ChatState = {
    error: false,
    loading: false,
    conversations: []
};
export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // builder

    },
});

export const ChatActions = chatSlice.actions;