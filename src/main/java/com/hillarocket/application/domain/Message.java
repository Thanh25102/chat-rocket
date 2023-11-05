package com.hillarocket.application.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UuidGenerator;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Table(name = "messages")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Message implements Serializable {
    @Id
//    @GenericGenerator(name = "UUIDGenerator")
//    @GeneratedValue(generator = "UUIDGenerator")
    @UuidGenerator(style = UuidGenerator.Style.TIME)
    UUID id;
    String messageText;

    LocalDateTime time;
    String senderName;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversation_id", referencedColumnName = "id")
    Conversation conversation;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", referencedColumnName = "id")
    User sender;
}



