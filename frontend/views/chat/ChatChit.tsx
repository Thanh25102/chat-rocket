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
import {DrawerToggle} from "@hilla/react-components/DrawerToggle";


export default function ChatChit() {
    const [items, setItems] = useState<MessageListItem[]>([]);
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user) return <Navigate to={"/login"} replace/>;
    const currentConversation = useAppSelector(ChatSelectors.getCurrentConversation())

    useEffect(() => {
        if (!currentConversation || !currentConversation.conversationId) return;
        setItems(fromMessages(currentConversation.messages));
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

    const handleConversationName = () => {
        if (!currentConversation) return "Chat";
        if (currentConversation.conversationName) return currentConversation.conversationName;
        const userGroup = currentConversation.users.filter(u => u.id !== user.id)
        return userGroup.map(u => u.fullName).join(", ");
    }

    return (
        <div className={"content"} style={{height: "100vh", display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", alignItems: "center", height: "10vh"}}>
                <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
                <div>
                    <h2 slot="navbar" className="text-m m-0">
                        {handleConversationName()}
                    </h2>
                    <span className="text-xs">Online 3p truoc</span>
                </div>
            </div>
            <MessageList items={items} className={"flex-grow"} style={{maxHeight: "800px", overflowY: "scroll"}}/>
            <div>
                <MessageInput className={"flex-grow"} style={{height: "60px"}}
                              onSubmit={(e: CustomEvent) => handleMessage(e.detail.value)}/>
            </div>
        </div>
    );
}

