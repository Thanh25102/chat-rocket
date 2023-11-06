import {MessageListItem} from "@vaadin/message-list";
import MessageDto from "Frontend/generated/com/hillarocket/application/dto/MessageDto";
import {format, parseISO} from 'date-fns'

export const fromMessages = (messages: MessageDto[]): MessageListItem[] => {
    return messages.map(msg => ({
        text: msg.messageText,
        userName: msg.senderName,
        time: format(parseISO(msg.time || new Date().toISOString()), "dd-MM-yyyy HH:mm"),
    }))
}
export const fromMessage = (message: MessageDto): MessageListItem => {
    return {
        text: message.messageText,
        userName: message.senderName,
        time: format(parseISO(message.time || new Date().toISOString()), "dd-MM-yyyy HH:mm"),
    }
}
