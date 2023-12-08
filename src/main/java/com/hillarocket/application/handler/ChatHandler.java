package com.hillarocket.application.handler;

import com.hillarocket.application.domain.Conversation;
import com.hillarocket.application.domain.GroupMember;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.*;
import com.hillarocket.application.enumration.ConversionType;
import com.hillarocket.application.mapper.GroupMemberMapper;
import com.hillarocket.application.mapper.MessageMapper;
import com.hillarocket.application.mapper.UserMapper;
import com.hillarocket.application.repo.ConversationRepo;
import com.hillarocket.application.repo.GroupMemberRepo;
import com.hillarocket.application.repo.MessageRepo;
import com.hillarocket.application.repo.UserRepo;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import javax.annotation.Nonnull;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ChatHandler {
    private final ConversationRepo conversationRepo;
    private final GroupMemberRepo groupMemberRepo;
    private final MessageRepo messageRepo;
    private final UserRepo userRepo;

    private final MessageMapper messageMapper;
    private final UserMapper userMapper;
    private final GroupMemberMapper groupMemberMapper;

    private final RedisTemplate<String, MessageDto> redisTemplate;

    private final Map<String, Sinks.Many<MessageDto>> chatRooms = new ConcurrentHashMap<>();
    private final Map<String, Flux<MessageDto>> replayedFluxes = new ConcurrentHashMap<>();

    public ChatHandler(ConversationRepo conversationRepo, GroupMemberRepo groupMemberRepo, MessageRepo messageRepo, UserRepo userRepo, MessageMapper messageMapper, UserMapper userMapper, GroupMemberMapper groupMemberMapper, RedisTemplate<String, MessageDto> redisTemplate) {
        this.conversationRepo = conversationRepo;
        this.groupMemberRepo = groupMemberRepo;
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.messageMapper = messageMapper;
        this.userMapper = userMapper;
        this.groupMemberMapper = groupMemberMapper;
        this.redisTemplate = redisTemplate;
    }

    public Flux<MessageDto> join(String roomId) {
        Sinks.Many<MessageDto> sink = chatRooms.computeIfAbsent(roomId, id -> Sinks.many().multicast().directBestEffort());
        return replayedFluxes.computeIfAbsent(roomId, id -> sink.asFlux());
    }

    public void send(String roomId, MessageDto message) {
        Sinks.Many<MessageDto> sink = chatRooms.get(roomId);
        if (sink != null) {
            sink.emitNext(message, ((signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED));
            var size = redisTemplate.opsForList().size(roomId);
            if (size != null && size >= 20) {
                var messages = redisTemplate.opsForList().range(roomId, 0, -1);
                if (messages != null && !messages.isEmpty()) {
                    redisTemplate.delete(roomId);
                    messageRepo.saveAll(messages.stream().map(messageMapper::toMsgEntity).toList());
                }
            } else {
                redisTemplate.opsForList().rightPush(roomId, message);
            }
        }
    }

    public List<Conversation> getAllConversation() {
        return conversationRepo.findAll();
    }

    public List<ConversationMessage> getConversationByUserId(UUID userId) {
        var conversations = conversationRepo.findConversationByUserId(userId);
        return conversations.stream().map(conversation -> {
            var users = conversation.getGroupMembers().stream().map(mem -> userMapper.toUserDto(mem.getUser())).toList();
            var lastedMessageRedis = getLatestMessages(conversation);
            var lastedMessage = lastedMessageRedis == null || lastedMessageRedis.isEmpty() ?
                    messageRepo.findNewestMessageByConversationId(conversation.getId()).stream().toList().stream().map(messageMapper::toMsgDto).toList() : lastedMessageRedis;
            return new ConversationMessage(conversation.getId(), conversation.getName(), conversation.getType(), users, lastedMessage);
        }).toList();
    }

    public List<ConversationMessage> getConversationGroupByName(String name) {
        var conversations = conversationRepo.findConversationGroupByName(name, ConversionType.GROUP);
        return conversations.stream().map(conversation -> {
            var users = convertGroupMembersToUserDto(conversation.getGroupMembers());
            return new ConversationMessage(conversation.getId(), conversation.getName(), conversation.getType(), users, List.of());
        }).toList();
    }

    public ConversationMessage getSingleConversationByUserId(String u1, String u2) {
        var id1 = UUID.fromString(u1);
        var id2 = UUID.fromString(u2);
        var conversation = conversationRepo.getSingleConversionByUserId(id1, id2)
                .orElseGet(() -> {
                    var createdConversation = new Conversation();
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
        var users = userRepo.findUserByConversationId(conversation.getId())
                .orElse(List.of())
                .stream().map(userMapper::toUserDto).toList();
        return new ConversationMessage(conversation.getId(), conversation.getName(), conversation.getType(), users, getMessageFromRedis(conversation));
    }

    private List<MessageDto> getMessageFromRedis(@Nonnull Conversation conversation) {
        var messagesDto = redisTemplate.opsForList().range(conversation.getId().toString(), 0, -1);
        if (messagesDto == null || messagesDto.isEmpty()) {
            var messages = messageRepo.find20NewestMessagesByConversationId(conversation.getId()).orElse(List.of());
            return messages.stream().map(messageMapper::toMsgDto).toList().reversed();
        }
        int size = messagesDto.size();
        if (size < 20) {
            int limit = 20 - size;
            var messages = messageRepo.findMessagesByConversationIdAndTime(conversation.getId(), messagesDto.getFirst().time(), PageRequest.of(0, limit));
            messagesDto.addAll(0, messages.stream().map(messageMapper::toMsgDto).toList().reversed());
        }
        return messagesDto;
    }

    public ConversationMessage getConversationById(String conversationId) throws IOException {
        var id = UUID.fromString(conversationId);
        var optConversation = conversationRepo.findById(id);
        if (optConversation.isEmpty()) throw new IOException("không tồn tại cuộc trò chuyện");
        var conversation = optConversation.get();

        var users = userRepo.findUserByConversationId(id)
                .orElse(List.of())
                .stream().map(userMapper::toUserDto).toList();
        return new ConversationMessage(id, conversation.getName(), conversation.getType(), users, getMessageFromRedis(conversation));
    }

    public ConversationMessage createConversation(@Nonnull CreateGroupConversion conversionDto) throws IOException {
        var conversation = conversationRepo.save(new Conversation(conversionDto.name(), ConversionType.GROUP));
        var groupMember = conversionDto.userIds().stream()
                .map(id -> groupMemberMapper.toGroupMemberEntity(new GroupMemberDto(UUID.fromString(id), conversation.getId(), LocalDateTime.now(), null)))
                .toList();
        groupMemberRepo.saveAll(groupMember);
        return this.getConversationById(conversation.getId().toString());
    }


    private List<UserDto> convertGroupMembersToUserDto(@Nonnull Set<GroupMember> groupMembers) {
        return groupMembers.stream()
                .map(mem -> userMapper.toUserDto(mem.getUser()))
                .toList();
    }

    private List<MessageDto> getLatestMessages(@Nonnull Conversation conversation) {
        var lastedMessageRedis = redisTemplate.opsForList().range(conversation.getId().toString(), 0, -1);
        return lastedMessageRedis == null || lastedMessageRedis.isEmpty() ?
                messageRepo.findNewestMessageByConversationId(conversation.getId()).stream().toList()
                        .stream().map(messageMapper::toMsgDto)
                        .toList() :
                lastedMessageRedis;
    }

}
