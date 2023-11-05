package com.hillarocket.application.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto implements Serializable {
    private UUID id;
    private String messageText;
    private LocalDateTime time;
    private String senderName;
    private UUID conversationId;
    private UUID senderId;
}
