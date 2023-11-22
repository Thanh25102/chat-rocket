package com.hillarocket.application.handler;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class FocusHandler {

    private final Map<String, Sinks.Many<Focus>> rooms = new ConcurrentHashMap<>();
    private final Map<String, Flux<Focus>> replayedFluxes = new ConcurrentHashMap<>();

    public Flux<Focus> join(String roomId) {
        Sinks.Many<Focus> sink = rooms.computeIfAbsent(roomId, id -> Sinks.many().multicast().directBestEffort());
        return replayedFluxes.computeIfAbsent(roomId, id -> sink.asFlux().replay(10).autoConnect());
    }

    public void focus(String roomId, Focus focus) {
        Sinks.Many<Focus> sink = rooms.get(roomId);
        if (sink != null)
            sink.emitNext(focus, ((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
    }

    public record Focus(String fullName, boolean isFocus) {
    }
}

