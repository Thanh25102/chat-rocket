package com.hillarocket.application.endpoint;

import com.hillarocket.application.domain.Conversation;
import com.hillarocket.application.dto.ConversationMessage;
import com.hillarocket.application.dto.MessageDto;
import com.hillarocket.application.handler.ChatHandler;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Flux;

import java.io.IOException;
import java.util.List;

@BrowserCallable
@AnonymousAllowed
@Log4j2
public class ChatEndpoint {
    private final ChatHandler chatHandler;

    public ChatEndpoint(ChatHandler chatHandler) {
        this.chatHandler = chatHandler;
    }

    public @Nonnull Flux<MessageDto> join(String roomId) {
        return chatHandler.join(roomId);
    }

    public void send(String roomId, MessageDto message) {
        chatHandler.send(roomId, message);
    }

    public List<Conversation> getAllConversation() {
        return chatHandler.getAllConversation();
    }

    public @Nonnull ConversationMessage getSingleConversationByUserId(@Nonnull String u1, @Nonnull String u2) {
        return chatHandler.getSingleConversationByUserId(u1, u2);
    }

    public @Nonnull ConversationMessage getConversationById(@Nonnull String conversationId) throws IOException {
        return chatHandler.getConversationById(conversationId);
    }
}
