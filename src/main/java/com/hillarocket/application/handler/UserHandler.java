package com.hillarocket.application.handler;

import com.hillarocket.application.dto.OnlineEvent;
import com.hillarocket.application.enumration.UserStatus;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserHandler {

    public final Sinks.Many<OnlineEvent> userOnlineSink;
    public final Flux<OnlineEvent> userOnlineFlux;

    public static final Set<String> usersOnline = new HashSet<>();

    public UserHandler() {
        userOnlineSink = Sinks.many().multicast().directBestEffort();
        userOnlineFlux = userOnlineSink.asFlux();
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
