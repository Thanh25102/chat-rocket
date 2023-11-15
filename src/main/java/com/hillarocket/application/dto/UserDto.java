package com.hillarocket.application.dto;

import java.io.Serializable;
import java.util.UUID;

public record UserDto(UUID id, String fullName, String email) implements Serializable {
}
