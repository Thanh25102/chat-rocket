package com.hillarocket.application.endpoint;

import com.hillarocket.application.domain.Conversation;
import com.hillarocket.application.domain.GroupMember;
import com.hillarocket.application.domain.Message;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.ConversationMessage;
import com.hillarocket.application.enumration.ConversionType;
import com.hillarocket.application.repo.ConversationRepo;
import com.hillarocket.application.repo.GroupMemberRepo;
import com.hillarocket.application.repo.MessageRepo;
import com.hillarocket.application.repo.UserRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nonnull;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@BrowserCallable
@AnonymousAllowed
@Log4j2
public class ChatEndpoint {
    private final Sinks.Many<Message> chatSinks;
    private final Flux<Message> chat;

    private final ConversationRepo conversationRepo;
    private final GroupMemberRepo groupMemberRepo;
    private final MessageRepo messageRepo;
    private final UserRepo userRepo;

    public ChatEndpoint(ConversationRepo conversationRepo, GroupMemberRepo groupMemberRepo, MessageRepo messageRepo, UserRepo userRepo) {
        this.conversationRepo = conversationRepo;
        this.groupMemberRepo = groupMemberRepo;
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        chatSinks = Sinks.many().multicast().directBestEffort();
        chat = chatSinks.asFlux().replay(10).autoConnect();
    }

    public @Nonnull Flux<@Nonnull Message> join() {
        return chat;
    }

    public void send(Message message) {
        message.setTime(ZonedDateTime.now().toLocalDateTime());
        chatSinks.emitNext(message, ((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
    }

    public List<Conversation> getAllConversation() {
        return conversationRepo.findAll();
    }

    public @Nonnull ConversationMessage getSingleConversationByUserId(@Nonnull String u1, @Nonnull String u2) {
        var id1 = UUID.fromString(u1);
        var id2 = UUID.fromString(u2);
        var conversation = conversationRepo.getSingleConversionByUserId(id1, id2)
                .orElseGet(() -> {
                    var createdConversation = new Conversation(UUID.randomUUID());
                    createdConversation.setType(ConversionType.SINGLE);
                    var savedConversation = conversationRepo.save(createdConversation);

                    var groupMem1 = new GroupMember(id1, savedConversation.getId());
                    groupMem1.setConversation(new Conversation(savedConversation.getId()));
                    groupMem1.setUser(new User(id1));
                    groupMem1.setJoinedDatetime(LocalDateTime.now());

                    var groupMem2 = new GroupMember(id2, savedConversation.getId());
                    groupMem2.setConversation(new Conversation(savedConversation.getId()));
                    groupMem2.setUser(new User(id2));
                    groupMem2.setJoinedDatetime(LocalDateTime.now());

                    groupMemberRepo.saveAll(List.of(groupMem1, groupMem2));
                    return savedConversation;
                });
        var messages = messageRepo.find20NewestMessagesByConversationId(conversation.getId()).orElse(List.of());
        var users = userRepo.findUserByConversationId(conversation.getId()).orElse(List.of());
        return new ConversationMessage(conversation.getId(), users, messages);
    }

    public @Nonnull ConversationMessage getConversationById(@Nonnull String conversationId) throws IOException {
        var id = UUID.fromString(conversationId);
        var conversation = conversationRepo.findById(id);
        if (conversation.isEmpty()) throw new IOException("không tồn tại cuộc trò chuyện");

        var messages = messageRepo.find20NewestMessagesByConversationId(id).orElse(List.of());
        var users = userRepo.findUserByConversationId(id).orElse(List.of());
        return new ConversationMessage(id, users, messages);
    }
}
