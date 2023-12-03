package com.hillarocket.application.handler;

import com.hillarocket.application.dto.MessageDto;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatHandler2 {
    private final Map<String, Sinks.Many<MessageDto>> mapUserId = new ConcurrentHashMap<>();
    private final Map<String, Flux<MessageDto>> replayedFluxes = new ConcurrentHashMap<>();

    public Flux<MessageDto> join(String userId) {
        Sinks.Many<MessageDto> sink = mapUserId.computeIfAbsent(userId, id -> Sinks.many().multicast().directBestEffort());
        return replayedFluxes.computeIfAbsent(userId, id -> sink.asFlux());
    }

    public void send(List<String> userIds, MessageDto message) {
        userIds.forEach(userId -> {
                    var sink = mapUserId.get(userId);
                    if (sink != null)
                        sink.emitNext(message, ((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
                }
        );
    }
}
