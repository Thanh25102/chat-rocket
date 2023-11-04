package com.hillarocket.application.endpoint;

import com.hillarocket.application.domain.Message;
import com.hillarocket.application.dto.MessageSender;
import dev.hilla.BrowserCallable;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;

@Controller()
@Log4j2
public class ChatSocket {

    private final SimpMessagingTemplate msgTemplate;

    public ChatSocket(SimpMessagingTemplate messageTemplate) {
        this.msgTemplate = messageTemplate;
    }

    @MessageMapping("/public-message")
    @SendTo("/chatroom/public")
    public Message sendPublic(@Payload Message message) {
        return message;
    }

    @MessageMapping("/private-message")
    public void sendPrivate(@Payload MessageSender message) {
        message.setTime(LocalDateTime.now());
        message.getRoom().forEach(id->msgTemplate.convertAndSendToUser(id,"/chat",message));
    }
}
