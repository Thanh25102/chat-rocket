package com.hillarocket.application.handler;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

@Service
public class UserHandler {
    public final Sinks.Many<String> userOnlineSink;
    public final Flux<String> userOnlineFlux;

    public UserHandler() {
        userOnlineSink = Sinks.many().multicast().directBestEffort();
        userOnlineFlux = userOnlineSink.asFlux().replay(1000).autoConnect();
    }

    public Flux<String> join() {
        return userOnlineFlux;
    }

    public void send(String userId) {
        userOnlineSink.emitNext(userId,
                (signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED
        );
    }

}
