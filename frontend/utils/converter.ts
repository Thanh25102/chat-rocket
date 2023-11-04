import Message from "Frontend/generated/com/hillarocket/application/domain/Message";
import {MessageListItem} from "@vaadin/message-list";

export const fromMessages = (messages: Message[]): MessageListItem[] => {
    return messages.map(msg => ({
        text: msg.messageText,
        userName: msg.senderName,
        time: msg.time,
    }))
}
export const fromMessage = (message: Message): MessageListItem => {
    return {
        text: message.messageText,
        userName: message.senderName,
        time: message.time,
    }
}
