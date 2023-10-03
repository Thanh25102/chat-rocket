package com.hillarocket.application.config;

import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import com.vaadin.flow.spring.security.AuthenticationContext;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Component
public class AuthenticatedUser {

    private final UserRepo userRepo;
    private final AuthenticationContext authenticationContext;

    public AuthenticatedUser(AuthenticationContext authenticationContext, UserRepo userRepo) {
        this.userRepo = userRepo;
        this.authenticationContext = authenticationContext;
    }

    @Transactional
    public Optional<User> get() {
        return authenticationContext.getAuthenticatedUser(Jwt.class)
                .map(userDetails -> userRepo.findByEmail(userDetails.getSubject()).get());
    }

    public void logout() {
        authenticationContext.logout();
    }

}