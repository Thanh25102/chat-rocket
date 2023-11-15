package com.hillarocket.application.mapper;

import com.hillarocket.application.domain.Conversation;
import com.hillarocket.application.domain.Message;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.MessageDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    @Mapping(target = "conversationId", source = "conversation.id")
    @Mapping(target = "senderId", source = "sender.id")
    MessageDto toMsgDto(Message msg);

    @Mapping(source = "conversationId", target = "conversation", qualifiedByName = "idToConversation")
    @Mapping(source = "senderId", target = "sender", qualifiedByName = "idToUser")
    Message toMsgEntity(MessageDto msg);

    @Named("idToConversation")
    default Conversation idToConversation(UUID id) {
        return id == null ? null : new Conversation(id);
    }

    @Named("idToUser")
    default User idToUser(UUID id) {
        return id == null ? null : new User(id);
    }
}
