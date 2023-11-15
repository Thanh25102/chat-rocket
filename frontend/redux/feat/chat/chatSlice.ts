import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageListItem} from "@vaadin/message-list";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {fromMessages} from "Frontend/utils/converter";
import ConversationMessage from "Frontend/generated/com/hillarocket/application/dto/ConversationMessage";

export type ChatState = {
    error: boolean,
    loading: boolean,
    conversations: { conversationId: string, messages: MessageListItem[] }[],
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
                .addCase(ChatThunks.getConversationByUserIds.fulfilled, (state, action) => {
                    const {conversationId, messages} = action.payload;
                    const conversation = state.conversations.find(c => c.conversationId === conversationId);
                    if (conversation) {
                        conversation.messages = fromMessages(messages);
                    } else {
                        state.conversations.push({
                            conversationId: conversationId,
                            messages: fromMessages(messages || [])
                        })
                    }
                    state.currentConversation = action.payload;
                    state.error = false
                    state.loading = false
                })
        },
    })
;

export const ChatActions = chatSlice.actions;