import {MessageListItem} from "@vaadin/message-list";
import MessageDto from "Frontend/generated/com/hillarocket/application/dto/MessageDto";
import {format, parseISO} from 'date-fns'
import {MessageType} from "react-chat-elements";

export const fromMessages = (messages: MessageDto[], curUser?: string): MessageListItem[] => {
    return messages.map(msg => ({
        text: msg.messageText,
        userName: msg.senderName,
        time: format(parseISO(msg.time || new Date().toISOString()), "dd-MM-yyyy HH:mm"),
        theme: msg.senderId === curUser ? 'current-user' : ""
    }))
}


export const toMessagesType = (messages: MessageDto[], curUser?: string): MessageType[] => {
    return messages.map(msg => ({
        id: msg.id || "",
        position: curUser === msg.senderId ? "right" : "left",
        text: msg.messageText || "",
        title: curUser === msg.senderId ? "You" : msg.senderName || "",
        focus: false,
        date: msg.time ? new Date(msg.time) : new Date(),
        titleColor: "red",
        forwarded: false,
        replyButton: true,
        removeButton: false,
        status: 'sent',
        notch: true,
        retracted: false,
        type: "text"
    }))
}

export const toMessageType = (msg: MessageDto, curUser?: string): MessageType => {
    return {
        id: msg.id || "",
        position: curUser === msg.senderId ? "left" : "right",
        text: msg.messageText || "",
        title: msg.senderName || "",
        focus: false,
        date: msg.time ? new Date(msg.time) : new Date(),
        titleColor: "red",
        forwarded: false,
        replyButton: true,
        removeButton: false,
        status: 'sent',
        notch: true,
        retracted: false,
        type: "text"
    }
}


export const fromMessage = (message: MessageDto, curUser?: string): MessageListItem => {
    return {
        text: message.messageText,
        userName: message.senderName,
        time: format(parseISO(message.time || new Date().toISOString()), "dd-MM-yyyy HH:mm"),
        theme: message.senderId === curUser ? 'current-user' : ""
    }
}
