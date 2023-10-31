package com.hillarocket.application.endpoint;

import com.hillarocket.application.domain.Conversion;
import com.hillarocket.application.domain.GroupMember;
import com.hillarocket.application.domain.Message;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.enumration.ConversionType;
import com.hillarocket.application.repo.ConversationRepo;
import com.hillarocket.application.repo.GroupMemberRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@BrowserCallable
@AnonymousAllowed
@Log4j2
public class ChatEndpoint {
    private final Sinks.Many<Message> chatSinks;
    private final Flux<Message> chat;

    private final ConversationRepo conversationRepo;
    private final GroupMemberRepo groupMemberRepo;

    public ChatEndpoint(ConversationRepo conversationRepo, GroupMemberRepo groupMemberRepo) {
        this.conversationRepo = conversationRepo;
        this.groupMemberRepo = groupMemberRepo;
        chatSinks = Sinks.many().multicast().directBestEffort();
        chat = chatSinks.asFlux().replay(10).autoConnect();
    }

    public @NonNull Flux<@NonNull Message> join() {
        return chat;
    }

    public void send(Message message) {
        message.setTime(ZonedDateTime.now().toLocalDateTime());
        chatSinks.emitNext(message, ((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
    }

    public List<Conversion> getAllConversions() {
        return conversationRepo.findAll();
    }

    public Conversion getSingleConversionByUserId(String u1, String u2) {
        var id1 = UUID.fromString(u1);
        var id2 = UUID.fromString(u2);
        log.debug("id1: " + id1);
        log.debug("id2: " + id2);
        var conver =  conversationRepo.getSingleConversionByUserId(id1, id2);
        return conver.orElseGet(() -> {
                    var createdConversion = new Conversion(UUID.randomUUID());
                    createdConversion.setType(ConversionType.SINGLE);
                    var savedConversion = conversationRepo.save(createdConversion);

                    var groupMem1 = new GroupMember(id1,savedConversion.getId());
                    groupMem1.setConversion(new Conversion(savedConversion.getId()));
                    groupMem1.setUser(new User(id1));
                    groupMem1.setJoinedDatetime(LocalDateTime.now());

                    var groupMem2 = new GroupMember(id2,savedConversion.getId());
                    groupMem2.setConversion(new Conversion(savedConversion.getId()));
                    groupMem2.setUser(new User(id2));
                    groupMem2.setJoinedDatetime(LocalDateTime.now());

                    groupMemberRepo.saveAll(List.of(groupMem1, groupMem2));
                    return savedConversion;
                });
    }

    public Optional<Conversion> getConversionById(String conversionId) {
        return conversationRepo.findById(UUID.fromString(conversionId));
    }

}
