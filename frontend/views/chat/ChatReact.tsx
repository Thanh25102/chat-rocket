import React, {useEffect, useRef, useState} from 'react';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import {useAppSelector} from "Frontend/redux/hooks";
import {Navigate} from "react-router-dom";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {ChatSelectors} from "Frontend/redux/feat/chat/chatSelectors";
import {ChatEndpoint, ChatEndpoint2} from "Frontend/generated/endpoints";
import {toMessagesType, toMessageType} from "Frontend/utils/converter";
import MessageLoader from "Frontend/components/loading/MessageLoading";
import {Avatar} from "Frontend/components/avatar/Avatar";
import {MessageList, MessageType} from "react-chat-elements"


export default function ChatReact() {
    const [items, setItems] = useState<MessageType[]>([]);
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user) return <Navigate to={"/login"} replace/>;
    const currentConversation = useAppSelector(ChatSelectors.getCurrentConversation())

    useEffect(() => {
        if (!currentConversation || !currentConversation.conversationId) return;
        setItems(toMessagesType(currentConversation.messages, user.id));
        const flux = ChatEndpoint.join(currentConversation.conversationId)
        flux.onNext((msg) => {
            if (!msg) return;
            setItems(prev => [...prev, toMessageType(msg, user.id)])
        })
        return () => {
            flux.cancel();
            setItems([])
        }
    }, [currentConversation, currentConversation?.conversationId]);

    const [userFocused, setUserFocused] = useState<string[]>([]);

    const handleMessage = (msg: string) => {
        if (!currentConversation || !currentConversation.conversationId) return;
        const message = {
            messageText: msg,
            senderName: user.fullName,
            senderId: user.id,
            conversationId: currentConversation.conversationId,
            time: new Date().toISOString()
        }
        ChatEndpoint.send(currentConversation.conversationId, message)
        ChatEndpoint2.send(currentConversation.users.map(u => u.id), message)
    }
    const handleConversationName = () => {
        if (!currentConversation) return "Chat";
        if (currentConversation.conversationName) return currentConversation.conversationName;
        const userGroup = currentConversation.users.filter(u => u.id !== user.id)
        return userGroup.map(u => u.fullName).join(", ");
    }

    useEffect(() => {
        if (!currentConversation || !currentConversation.conversationId) return;
        const flux = ChatEndpoint.joinFocus(currentConversation.conversationId)
        flux.onNext((focusEvent) => {
            if (!focusEvent) return;
            focusEvent.isFocus ?
                setUserFocused(prev => [...prev, focusEvent?.fullName || ""]) :
                setUserFocused(prev => prev.filter(user => user !== focusEvent.fullName));
        })
        return () => {
            flux.cancel();
            setUserFocused([])
        }
    }, [currentConversation, currentConversation?.conversationId]);

    const handleFocus = () => ChatEndpoint.focus(currentConversation?.conversationId, {
        isFocus: true,
        fullName: user.fullName
    });

    const handleBlur = () => ChatEndpoint.focus(currentConversation?.conversationId, {
        isFocus: false,
        fullName: user.fullName
    });
    const messageRef = useRef();

    return (
        <div className={"content"} style={{height: "90vh", display: "flex", flexDirection: "column"}}>
            <div style={{display: "flex", alignItems: "center", height: "10vh"}} className={"space-x-4 ml-4 py-2"}>
                <Avatar
                    names={currentConversation?.users.filter(u => u.id !== user.id).map(u => u.fullName || "u") || ["U"]}
                    size={36}/>
                <div>
                    <h2 slot="navbar" className="text-m m-0">
                        {handleConversationName()}
                    </h2>
                    <span className="text-xs">Online 3p truoc</span>
                </div>
            </div>
                <MessageList
                    className={"message-list overflow-y-scroll h-full"}
                    lockable={true}
                    toBottomHeight={'100%'}
                    referance={messageRef}
                    dataSource={items}
                />
            <div>
                {
                    userFocused.filter(u => u !== user.fullName).length > 0 && (
                        <div className={"flex w-[100] ml-4 space-x-2 align-middle"}>
                            <Avatar names={userFocused.filter(u => u !== user.fullName)} size={46} type={"horizontal"}/>
                            <div className={"flex align-middle"}>
                                <MessageLoader/>
                            </div>
                        </div>
                    )
                }
                <MessageInput className={"flex-grow"} style={{height: "60px"}} onFocus={handleFocus} onBlur={handleBlur}
                              onSubmit={(e: CustomEvent) => handleMessage(e.detail.value)}/>
            </div>

        </div>
    );
}

