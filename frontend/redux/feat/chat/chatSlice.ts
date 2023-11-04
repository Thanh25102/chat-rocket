import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MessageListItem} from "@vaadin/message-list";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {formMessagesSender, fromMessages} from "Frontend/utils/converter";
import MessageSender from "Frontend/generated/com/hillarocket/application/dto/MessageSender";
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
            /**
             * @ManhThanh
             * SocketActions
             */
            receiveMessage(state, action: PayloadAction<MessageSender>) {
                const message = action.payload;
                const conversation = state.conversations.find(conversation => conversation.conversationId == message.conversationId)
                const msg = formMessagesSender([message])
                if (conversation)
                    conversation.messages = [...conversation.messages, ...msg];
                else
                    state.conversations.push({conversationId: action.payload.conversationId || "", messages: msg});
            },
            getConversationById(state, action: PayloadAction<string>) {
                state.conversations.find(conversation => conversation.conversationId === action.payload);
            }
            /**
             * @End
             */
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
                .addCase(ChatThunks.sendMessage.fulfilled, (state, action) => {
                    const {conversationId, message} = action.payload as { conversationId: string, message: MessageSender };
                    const conversation = state.conversations.find(conversation => conversation.conversationId === conversationId)
                    if (conversation) conversation.messages.push(message);
                })
        },
    })
;

export const ChatActions = chatSlice.actions;