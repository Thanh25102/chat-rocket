package com.hillarocket.application.endpoint;

import com.hillarocket.application.config.AuthenticatedUser;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.List;
import java.util.Optional;

@Endpoint
public class UserEndpoint {
    private final UserRepo userRepo;
    private final AuthenticatedUser authenticatedUser;

    public UserEndpoint(UserRepo userRepo, AuthenticatedUser authenticatedUser) {
        this.userRepo = userRepo;
        this.authenticatedUser = authenticatedUser;
    }

    public String currentThread() {
        return Thread.currentThread().toString();
    }

    @AnonymousAllowed
    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }

    @AnonymousAllowed
    public  List<@Nonnull User> findAll() {
        return userRepo.findAll();
    }
}
