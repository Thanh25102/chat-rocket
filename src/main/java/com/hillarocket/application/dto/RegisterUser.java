package com.hillarocket.application.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record RegisterUser(@NotBlank(message = "FullName is mandatory") String fullName,@NotBlank(message = "Password is mandatory") String password,
                           String repeatedPassword,
                           @NotBlank(message = "Email is mandatory")
                           @Email
                           String email) {
}
