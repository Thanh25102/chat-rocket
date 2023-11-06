package com.hillarocket.application.dto;

import com.hillarocket.application.enumration.UserStatus;
import dev.hilla.Nonnull;

public record OnlineEvent(@Nonnull String userId, @Nonnull UserStatus status) {
}
