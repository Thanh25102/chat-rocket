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
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@BrowserCallable
@AnonymousAllowed
@Log4j2
public class ChatEndpoint {
    private final ConversationRepo conversationRepo;
    private final GroupMemberRepo groupMemberRepo;
    private final MessageRepo messageRepo;
    private final UserRepo userRepo;

    private final Map<String, Sinks.Many<Message>> chatRooms = new ConcurrentHashMap<>();
    private final Map<String, Flux<Message>> replayedFluxes = new ConcurrentHashMap<>();

    public ChatEndpoint(ConversationRepo conversationRepo, GroupMemberRepo groupMemberRepo, MessageRepo messageRepo, UserRepo userRepo) {
        this.conversationRepo = conversationRepo;
        this.groupMemberRepo = groupMemberRepo;
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
    }

    public @Nonnull Flux<Message> join(String roomId) {
        Sinks.Many<Message> sink = chatRooms.computeIfAbsent(roomId, id -> Sinks.many().multicast().directBestEffort());
        return replayedFluxes.computeIfAbsent(roomId, id -> sink.asFlux().replay(10).autoConnect());
    }

    public void send(String roomId, Message message) {
        Sinks.Many<Message> sink = chatRooms.get(roomId);
        if (sink != null) {
            sink.emitNext(message, ((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
        }
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
