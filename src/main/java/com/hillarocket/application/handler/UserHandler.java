package com.hillarocket.application.handler;

import com.hillarocket.application.domain.Role;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.OnlineEvent;
import com.hillarocket.application.enumration.UserStatus;
import com.hillarocket.application.repo.UserRepo;
import dev.hilla.exception.EndpointException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserHandler {

    public final Sinks.Many<OnlineEvent> userOnlineSink;
    public final Flux<OnlineEvent> userOnlineFlux;

    public static final Set<String> usersOnline = new HashSet<>();
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserHandler(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        userOnlineSink = Sinks.many().multicast().directBestEffort();
        userOnlineFlux = userOnlineSink.asFlux();
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(User user) {
        var opl = userRepo.findByEmail(user.getEmail());
        if (opl.isPresent()) throw new EndpointException("Email is already registered");
        return opl.orElseGet(() -> {
            user.setRole(Role.USER);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepo.save(user);
        });
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    public List<User> searchUser(String searchKey) {
        return userRepo.findByFullNameOrEmail(searchKey);
    }

    public List<String> getUsersOnline() {
        return usersOnline.stream().toList();
    }

    public Flux<OnlineEvent> join() {
        return userOnlineFlux;
    }

    public void send(OnlineEvent event) {
        if (event.status() == UserStatus.ONLINE)
            usersOnline.add(event.userId());
        else
            usersOnline.remove(event.userId());
        userOnlineSink.emitNext(event,
                (signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED
        );
    }

}
