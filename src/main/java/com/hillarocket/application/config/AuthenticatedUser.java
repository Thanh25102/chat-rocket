package com.hillarocket.application.config;

import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import com.vaadin.flow.spring.security.AuthenticationContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class AuthenticatedUser {

    private final UserRepo userRepo;
    private final AuthenticationContext authContext;

    public AuthenticatedUser(AuthenticationContext authContext, UserRepo userRepo) {
        this.userRepo = userRepo;
        this.authContext = authContext;
    }

    @Transactional
    public Optional<User> get() {
        var userEmail = findAuthenticatedUserEmail();
        return userRepo.findByEmail(userEmail);
    }

    private String findAuthenticatedUserEmail() {
        try {
            return authContext.getAuthenticatedUser(OidcUser.class)
                    .map(OidcUser::getEmail)
                    .orElseGet(() -> SecurityContextHolder.getContext().getAuthentication().getName());
        } catch (ClassCastException e) {
            return SecurityContextHolder.getContext().getAuthentication().getName();
        }
    }

    public void logout() {
        authContext.logout();
    }

}