import React, {useEffect, useState} from 'react';
import {MessageList} from '@hilla/react-components/MessageList.js';
import {MessageInput} from '@hilla/react-components/MessageInput.js';
import type {MessageListItem} from '@vaadin/message-list';


export default function ChatView() {

    const [items, setItems] = useState<MessageListItem[]>([]);

    useEffect(() => {

    }, []);

    return (
        <div className={"content"} style={{height: "90vh", display: "flex", flexDirection: "column"}}>
            <MessageList items={items} className={"flex-grow"} style={{maxHeight: "800px", overflowY: "scroll"}}/>
            <div>
                <MessageInput className={"flex-grow"}
                              style={{height: "60px"}}
                              onSubmit={(e: CustomEvent) => {}}
                />
            </div>
        </div>
    );
}

