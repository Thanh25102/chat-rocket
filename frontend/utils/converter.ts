import {MessageListItem} from "@vaadin/message-list";
import MessageDto from "Frontend/generated/com/hillarocket/application/dto/MessageDto";

export const fromMessages = (messages: MessageDto[]): MessageListItem[] => {
    return messages.map(msg => ({
        text: msg.messageText,
        userName: msg.senderName,
        time: msg.time,
    }))
}
export const fromMessage = (message: MessageDto): MessageListItem => {
    return {
        text: message.messageText,
        userName: message.senderName,
        time: message.time,
    }
}
