import React, {useEffect, useState} from 'react';
import {MessageList} from '@hilla/react-components/MessageList.js';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import type {MessageListItem} from '@vaadin/message-list';
import {ChatEndpoint} from "Frontend/generated/endpoints";
import {useAppSelector} from "Frontend/redux/hooks";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";

export default function ChatView() {
    const [items, setItems] = useState<MessageListItem[]>([]);
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    console.log("user", user)

    useEffect(() => {
        ChatEndpoint.join().onNext(message => {
            console.log(message, message)
            setItems(prev => [...prev, {
                text: message?.messageText,
                time: message?.time,
                userName: message?.senderName,
            }])
        })
    }, []);

    return (
        <div className={"content"} style={{height: "90vh", display: "flex", flexDirection: "column"}}>
            <MessageList items={items} className={"flex-grow"} style={{maxHeight: "800px", overflowY: "scroll"}}/>
            <div>
                <MessageInput className={"flex-grow"}
                              style={{height: "60px"}}
                              onSubmit={(e: CustomEvent) => {
                                  ChatEndpoint.send({messageText: e.detail.value, senderName: user?.fullName})
                              }}
                />
            </div>
        </div>
    );
}

