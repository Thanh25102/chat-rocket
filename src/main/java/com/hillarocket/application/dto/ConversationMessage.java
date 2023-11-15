package com.hillarocket.application.dto;

import com.hillarocket.application.enumration.ConversionType;
import dev.hilla.Nonnull;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

public record ConversationMessage(
        @Nonnull UUID conversationId,
        String conversationName,
        ConversionType conversionType,
        @Nonnull List<@Nonnull UserDto> users,
        @Nonnull List<@Nonnull MessageDto> messages
) implements Serializable {
}
