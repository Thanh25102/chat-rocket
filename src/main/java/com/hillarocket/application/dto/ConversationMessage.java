package com.hillarocket.application.dto;

import com.hillarocket.application.domain.Message;
import com.hillarocket.application.domain.User;
import dev.hilla.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ConversationMessage implements Serializable {
    private @Nonnull UUID conversationId;
    private @Nonnull List<@Nonnull UserDto> users;
    private @Nonnull List<@Nonnull MessageDto> messages;
}
