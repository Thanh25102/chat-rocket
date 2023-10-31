import {createSelector} from "@reduxjs/toolkit";
import Role from "Frontend/generated/com/hillarocket/application/domain/Role";
import {ChatState} from "Frontend/redux/feat/chat/chatSlice";

interface PartialAuthState {
    chat: ChatState;
}


const chatStateSelector = (state: PartialAuthState) => state.chat;

export const ChatSelectors = {
    chatStateSelector,
    getConversation:(conversationId:string)=>createSelector(chatStateSelector,({conversations})=>{
        return conversations.find(conversation=>conversation.conversationId == conversationId)
    }),
    getAllConversation:()=>{

    }
};