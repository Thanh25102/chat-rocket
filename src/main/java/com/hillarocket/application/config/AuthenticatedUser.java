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
        try {
            return authContext.getAuthenticatedUser(OidcUser.class)
                    .flatMap(u -> userRepo.findByEmail(u.getEmail()));
        } catch (ClassCastException e) {
            var email = SecurityContextHolder.getContext().getAuthentication().getName();
            return userRepo.findByEmail(email);
        }
    }

    public void logout() {
        authContext.logout();
    }

}