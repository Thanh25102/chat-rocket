package com.hillarocket.application.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record GroupMemberDto(UUID userId, UUID conversationId, LocalDateTime joinedDatetime,
                             LocalDateTime leftDatetime) {
}
