package com.hillarocket.application.dto;

import com.hillarocket.application.domain.Message;
import com.hillarocket.application.domain.User;
import dev.hilla.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class ConversationMessage {
    private @Nonnull UUID conversationId;
    private @Nonnull List<@Nonnull User> users;
    private @Nonnull List<@Nonnull Message> messages;
}
