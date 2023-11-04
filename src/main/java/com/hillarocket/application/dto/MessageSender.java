package com.hillarocket.application.dto;

import com.hillarocket.application.domain.User;
import dev.hilla.Nonnull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MessageSender {
    private String conversationId;
    private String content;
    private LocalDateTime time;
    private User sender;
    private List<@Nonnull String> room;

    public MessageSender() {
    }

    public MessageSender(String content, LocalDateTime time, User sender, List<String> room) {
        this.content = content;
        this.time = time;
        this.sender = sender;
        this.room = room;
    }

}
