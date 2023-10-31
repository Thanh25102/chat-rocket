package com.hillarocket.application.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "group_member")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class GroupMember {
    @EmbeddedId
    GroupMemberKey id;
    LocalDateTime joinedDatetime;
    LocalDateTime leftDatetime;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne()
    @MapsId("conversationId")
    @JoinColumn(name = "conversation_id")
    Conversion conversion;

    public GroupMember(UUID user,UUID conversationId){
        this.id = new GroupMemberKey(user,conversationId);
    }

    @Embeddable
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class GroupMemberKey implements Serializable {
        UUID userId;
        UUID conversationId;
    }
}

