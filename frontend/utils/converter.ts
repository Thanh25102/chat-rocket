import Message from "Frontend/generated/com/hillarocket/application/domain/Message";
import {MessageListItem} from "@vaadin/message-list";
import MessageSender from "Frontend/generated/com/hillarocket/application/dto/MessageSender";

export const fromMessages = (messages: Message[]): MessageListItem[] => {
    return messages.map(msg => ({
        text: msg.messageText,
        userName: msg.senderName,
        time: msg.time,
    }))
}
export const formMessagesSender = (messages: MessageSender[]): MessageListItem[] => {
    return messages.map(msg => ({
        text: msg.content,
        userName: msg.sender?.fullName,
        time: msg.time,
    }))
}