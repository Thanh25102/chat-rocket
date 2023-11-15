package com.hillarocket.application.dto;

import com.hillarocket.application.enumration.UserStatus;
import dev.hilla.Nonnull;

import java.io.Serializable;
import java.time.LocalDateTime;

public record OnlineEvent(@Nonnull String userId, @Nonnull UserStatus status, LocalDateTime lastOnlineTime) implements Serializable {
}
