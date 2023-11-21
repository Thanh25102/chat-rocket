package com.hillarocket.application.domain;

import com.hillarocket.application.enumration.ConversionType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Getter
@Table(name = "conversations")
@Entity
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@EntityListeners(AuditingEntityListener.class)
public class Conversation implements Serializable {
    @Id
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    UUID id;
    String name;
    @Enumerated(EnumType.STRING)
    ConversionType type;

    @CreatedDate
    LocalDateTime createDate;
    @LastModifiedDate
    LocalDateTime lastModified;

    @Getter
    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    Set<GroupMember> groupMembers;


    public Conversation(String name, ConversionType type) {
        this.name = name;
        this.type = type;
    }

    public Conversation(UUID id) {
        this.id = id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(ConversionType type) {
        this.type = type;
    }

    public void setGroupMembers(Set<GroupMember> groupMembers) {
        this.groupMembers = groupMembers;
    }

    public void setCreateDate(LocalDateTime createDate) {
        this.createDate = createDate;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }
}