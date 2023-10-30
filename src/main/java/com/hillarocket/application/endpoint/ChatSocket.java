package com.hillarocket.application.endpoint;

import com.hillarocket.application.domain.Message;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

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
        log.debug("Socket innn" + message.toString());
        return message;
    }

    @MessageMapping("/private-message")
    public Message sendPrivate(@Payload Message message) {
        msgTemplate.convertAndSendToUser(message.getSenderName(), "/private", message);
        return message;
    }
}
