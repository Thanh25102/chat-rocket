package com.hillarocket.application.mapper;

import com.hillarocket.application.domain.Conversation;
import com.hillarocket.application.domain.Message;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.MessageDto;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class MessageMapper {
    public MessageDto mapToDto(Message message) {
        return new MessageDto(message.getId(), message.getMessageText(), message.getTime(), message.getSenderName(), message.getConversation().getId(), message.getSender().getId());
    }

    public Message mapToEntity(MessageDto message) {
        var user = new User(message.getSenderId());
        var conversation = new Conversation(message.getConversationId());
        return new Message(message.getId(), message.getMessageText(), message.getTime(), message.getSenderName(), conversation, user);
    }
}
