import React, {useEffect, useState} from 'react';
import {MessageList} from '@hilla/react-components/MessageList.js';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import type {MessageListItem} from '@vaadin/message-list';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {Navigate, useParams} from "react-router-dom";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";


export default function ChatChit() {
    const {id} = useParams();
    const [items, setItems] = useState<MessageListItem[]>([]);
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user) return <Navigate to={"/login"} replace/>;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) createConversion(id)
    }, [id]);

    const createConversion = (userId: string) => {
        if (!user.id) return;
        dispatch(ChatThunks.getConversationByUserIds({u1: user.id, u2: userId}));
    }

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

