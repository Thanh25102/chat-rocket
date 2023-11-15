package com.hillarocket.application.dto;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

public record MessageDto(
        UUID id,
        String messageText,
        LocalDateTime time,
        String senderName,
        UUID conversationId,
        UUID senderId
)  implements Serializable {

}
