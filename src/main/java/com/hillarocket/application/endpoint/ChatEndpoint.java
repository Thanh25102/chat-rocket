package com.hillarocket.application.endpoint;

import com.google.common.io.CharSink;
import com.hillarocket.application.domain.Message;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Endpoint;
import lombok.NonNull;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.ZonedDateTime;

@BrowserCallable
@AnonymousAllowed
public class ChatEndpoint {
    private final Sinks.Many<Message> chatSinks;
    private final Flux<Message> chat;

    public ChatEndpoint(){
        chatSinks = Sinks.many().multicast().directBestEffort();
        chat = chatSinks.asFlux().replay(10).autoConnect();
    }

    public @NonNull Flux<@NonNull Message> join(){
        return chat;
    }

    public void send(Message message){
        message.setTime(ZonedDateTime.now().toLocalDateTime());
        chatSinks.emitNext(message,((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
    }


}
