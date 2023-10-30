import React, {useEffect, useState} from 'react';
import {MessageList} from '@hilla/react-components/MessageList.js';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import type {MessageListItem} from '@vaadin/message-list';
import {useAppDispatch} from "Frontend/redux/hooks";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import Message from "Frontend/generated/com/hillarocket/application/domain/Message";
import {useParams} from "react-router-dom";


export default function ChatChit() {
    const { id } = useParams();
    const [items, setItems] = useState<MessageListItem[]>([]);

    useEffect(() => {

    }, []);

    return (
        <div className={"content"} style={{height: "90vh", display: "flex", flexDirection: "column"}}>
            <MessageList items={items} className={"flex-grow"} style={{maxHeight: "800px", overflowY: "scroll"}}/>
            <div>
                <MessageInput className={"flex-grow"}
                              style={{height: "60px"}}
                              onSubmit={(e: CustomEvent) => {
                              }}
                />
            </div>
        </div>
    );
}

