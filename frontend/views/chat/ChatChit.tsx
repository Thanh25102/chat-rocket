import React, {useEffect, useState} from 'react';
import {MessageList} from '@hilla/react-components/MessageList.js';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import type {MessageListItem} from '@vaadin/message-list';
import {useAppSelector} from "Frontend/redux/hooks";
import {Navigate} from "react-router-dom";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {ChatSelectors} from "Frontend/redux/feat/chat/chatSelectors";
import {ChatEndpoint} from "Frontend/generated/endpoints";
import {fromMessage, fromMessages} from "Frontend/utils/converter";


export default function ChatChit() {
    const [items, setItems] = useState<MessageListItem[]>([]);
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user) return <Navigate to={"/login"} replace/>;
    const currentConversation = useAppSelector(ChatSelectors.getCurrentConversation())

    useEffect(() => {
        if (!currentConversation || !currentConversation.conversationId) return;
        if (items.length === 0) setItems(fromMessages(currentConversation.messages));
    }, []);

    useEffect(() => {
        if (!currentConversation || !currentConversation.conversationId) return;
        const flux = ChatEndpoint.join(currentConversation.conversationId)
        flux.onNext((msg) => {
            if (!msg) return;
            setItems(prev => [...prev, fromMessage(msg)])
        })
        return () => {
            flux.cancel();
            setItems([])
        }
    }, [currentConversation, currentConversation?.conversationId]);

    const handleMessage = (msg: string) => {
        if (!currentConversation || !currentConversation.conversationId) return;
        ChatEndpoint.send(currentConversation.conversationId, {
            messageText: msg,
            senderName: user.fullName,
            senderId: user.id,
            conversationId: currentConversation.conversationId
        })
    }

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

