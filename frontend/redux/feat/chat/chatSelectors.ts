import {createSelector} from "@reduxjs/toolkit";
import {ChatState} from "Frontend/redux/feat/chat/chatSlice";

interface PartialAuthState {
    chat: ChatState;
}


const chatStateSelector = (state: PartialAuthState) => state.chat;

export const ChatSelectors = {
    chatStateSelector,
    getConversationById: (conversationId: string) => createSelector(chatStateSelector, ({conversations}) => {
        return conversations.find(conversation => conversation.conversationId == conversationId)
    }),
    getCurrentConversation: () => createSelector(chatStateSelector, ({currentConversation}) => {
        return currentConversation
    }),
    getAllConversation: () => createSelector(chatStateSelector, ({conversations}) => {
        return conversations;
    }),
};