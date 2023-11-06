package com.hillarocket.application.utils;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SecurityUtils {

    private final UserDetailsService userDetailsService;

    public SecurityUtils(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    public Optional<UserDetails> getAuthenticatedUser() {
        SecurityContext context = SecurityContextHolder.getContext();
        Object principal = context.getAuthentication().getPrincipal();
        if (principal instanceof Jwt) {
            String username = ((Jwt) principal).getSubject();
            return Optional.of(userDetailsService.loadUserByUsername(username));
        }
        // Anonymous or no authentication.
        return Optional.empty();
    }

}