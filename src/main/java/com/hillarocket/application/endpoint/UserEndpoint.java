package com.hillarocket.application.endpoint;

import com.hillarocket.application.config.AuthenticatedUser;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.OnlineEvent;
import com.hillarocket.application.handler.UserHandler;
import com.hillarocket.application.repo.UserRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Optional;

@BrowserCallable
@AnonymousAllowed
public class UserEndpoint {
    private final UserRepo userRepo;
    private final AuthenticatedUser authenticatedUser;
    private final UserHandler userHandler;

    public UserEndpoint(UserRepo userRepo, AuthenticatedUser authenticatedUser, UserHandler userHandler) {
        this.userRepo = userRepo;
        this.authenticatedUser = authenticatedUser;
        this.userHandler = userHandler;
    }

    public String currentThread() {
        return Thread.currentThread().toString();
    }

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }

    public List<@Nonnull User> findAll() {
        return userRepo.findAll();
    }

    public List<@Nonnull String> findUsersOnline() {
        return userHandler.getUsersOnline();
    }

    public Flux<@Nonnull OnlineEvent> join() {
        return userHandler.join();
    }

    public void send(@Nonnull OnlineEvent userId) {
        userHandler.send(userId);
    }
}
