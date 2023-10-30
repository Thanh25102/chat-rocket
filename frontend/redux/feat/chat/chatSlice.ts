import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {createSlice} from "@reduxjs/toolkit";
import Message from "Frontend/generated/com/hillarocket/application/domain/Message";

export type AuthState = {
    error: boolean,
    loading: boolean,
    messagesSet: { conversationId: string, messages: Message[] }[],
}
const initialState: AuthState = {
    error: false,
    loading: false,
    messagesSet: []
};
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

    },
});

export const AuthActions = authSlice.actions;