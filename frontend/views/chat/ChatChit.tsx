import React, {useCallback, useState} from 'react';
import {MessageList} from '@hilla/react-components/MessageList.js';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import type {MessageListItem} from '@vaadin/message-list';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {Navigate} from "react-router-dom";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import MessageSender from "Frontend/generated/com/hillarocket/application/dto/MessageSender";
import {ChatSelectors} from "Frontend/redux/feat/chat/chatSelectors";


export default function ChatChit() {
    const [items, setItems] = useState<MessageListItem[]>([]);
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user) return <Navigate to={"/login"} replace/>;
    const dispatch = useAppDispatch();
    const currentConversation = useAppSelector(ChatSelectors.getCurrentConversation())

    const handleMessage = useCallback((msg: string) => {
        if (!currentConversation) return;
        const message: MessageSender = {
            content: msg,
            room: currentConversation.users.filter(u => u.id !== user.id).map(u => u.id || ""),
            sender: user,
            conversationId: currentConversation.conversationId
        };
        dispatch(ChatThunks.sendMessage(message))
    }, [user, user.id, currentConversation, currentConversation?.conversationId])

    return (
        <div className={"content"} style={{height: "90vh", display: "flex", flexDirection: "column"}}>
            <MessageList items={items} className={"flex-grow"} style={{maxHeight: "800px", overflowY: "scroll"}}/>
            <div>
                <MessageInput className={"flex-grow"} style={{height: "60px"}}
                              onSubmit={(e: CustomEvent) => handleMessage(e.detail.value)}/>
            </div>
        </div>
    );
}

