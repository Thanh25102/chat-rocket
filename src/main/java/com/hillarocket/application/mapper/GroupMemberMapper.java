package com.hillarocket.application.mapper;

import com.hillarocket.application.domain.Conversation;
import com.hillarocket.application.domain.GroupMember;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.GroupMemberDto;
import org.mapstruct.*;

import java.util.UUID;

@Mapper(componentModel = "spring")
public interface GroupMemberMapper {

    @Mapping(source = "conversationId", target = "conversation", qualifiedByName = "idToConversation")
    @Mapping(source = "userId", target = "user", qualifiedByName = "idToUser")
    @Mapping(target = "id", ignore = true)
    GroupMember toGroupMemberEntity(GroupMemberDto groupMemberDto);

    @Named("idToConversation")
    default Conversation idToConversation(UUID id) {
        return id == null ? null : new Conversation(id);
    }

    @Named("idToUser")
    default User idToUser(UUID id) {
        return id == null ? null : new User(id);
    }

    @AfterMapping
    default void setGroupMemberKey(@MappingTarget GroupMember groupMember, GroupMemberDto dto) {
        if (dto.userId() != null && dto.conversationId() != null) {
            groupMember.setId(new GroupMember.GroupMemberKey(dto.userId(), dto.conversationId()));
        }
    }
}
