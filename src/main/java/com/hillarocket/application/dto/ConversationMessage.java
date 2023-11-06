package com.hillarocket.application.dto;

import com.hillarocket.application.enumration.ConversionType;
import dev.hilla.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ConversationMessage implements Serializable {
    private @Nonnull UUID conversationId;
    private String conversationName;
    private ConversionType conversionType;
    private @Nonnull List<@Nonnull UserDto> users;
    private @Nonnull List<@Nonnull MessageDto> messages;
}
