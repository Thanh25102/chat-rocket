package com.hillarocket.application.endpoint;


import com.hillarocket.application.dto.MessageDto;
import com.hillarocket.application.handler.ChatHandler2;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Flux;

import java.util.List;

@BrowserCallable
@AnonymousAllowed
@Log4j2
public class ChatEndpoint2 {
    private final ChatHandler2 chatHandler2;

    public ChatEndpoint2(ChatHandler2 chatHandler2) {
        this.chatHandler2 = chatHandler2;
    }

    public @Nonnull Flux<MessageDto> join(String userId) {
        return chatHandler2.join(userId);
    }

    public void send(List<String> userIds, MessageDto message) {
        chatHandler2.send(userIds, message);
    }
}
