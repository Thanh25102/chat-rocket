import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import ConversationMessage from "Frontend/generated/com/hillarocket/application/dto/ConversationMessage";

export type ChatState = {
    error: boolean,
    loading: boolean,
    conversations: ConversationMessage[],
    currentConversation?: ConversationMessage,
}
const initialState: ChatState = {
    error: false,
    loading: false,
    conversations: [],
};
export const chatSlice = createSlice({
        name: "chat",
        initialState,
        reducers: {
            getConversationById(state, action: PayloadAction<string>) {
                state.conversations.find(conversation => conversation.conversationId === action.payload);
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(ChatThunks.getConversationByUserId.fulfilled, (state, action) => {
                    state.conversations = action.payload
                    state.error = false
                    state.loading = false
                })
                .addCase(ChatThunks.getConversationByUserIds.fulfilled, (state, action) => {
                    const {conversationId, messages} = action.payload;
                    const conversation = state.conversations.find(c => c.conversationId === conversationId);
                    if (conversation) {
                        conversation.messages = messages;
                    } else {
                        state.conversations.push(action.payload)
                    }
                    state.currentConversation = action.payload;
                    state.error = false
                    state.loading = false
                })
                .addCase(ChatThunks.getCurrentConversation.fulfilled, (state, action) => {
                    state.currentConversation = action.payload
                    state.error = false
                    state.loading = false
                })
                .addCase(ChatThunks.getCurrentConversation.pending, (state, action) => {
                    state.loading = true
                })
                .addCase(ChatThunks.getCurrentConversation.rejected, (state, action) => {
                    state.loading = false
                    state.error = true
                })
                .addCase(ChatThunks.createConversation.fulfilled, (state, action) => {
                    state.loading = false
                    state.error = false
                    state.conversations.unshift(action.payload)
                })
        },
    })
;

export const ChatActions = chatSlice.actions;