import {useRef, useState} from "react";
import { MessageListItem} from "@hilla/react-components/MessageList";
import {MessageInput} from "@hilla/react-components/MessageInput";
import {OpenApiHandler} from "Frontend/generated/endpoints";
import "react-chat-elements/dist/main.css"
import {MessageList} from "@hilla/react-components/MessageList.js";

export default function ChatNormal() {
    const [messages, setMessages] = useState<MessageListItem[]>([]);

    async function sendMessage(message: string) {
        setMessages(messages => [...messages, {
            text: message,
            userName: 'You'
        }]);

        const response = await OpenApiHandler.chat(message);
        setMessages(messages => [...messages, {
            text: response,
            userName: 'Assistant'
        }]);
    }

    return (
        <div className="p-m flex flex-col h-full box-border">
            <MessageList items={messages} className="flex-grow"/>
            <MessageInput onSubmit={e => sendMessage(e.detail.value)}/>
        </div>
    );
}