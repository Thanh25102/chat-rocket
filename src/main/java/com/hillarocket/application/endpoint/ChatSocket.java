package com.hillarocket.application.endpoint;

import com.hillarocket.application.domain.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller()
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
    public Message sendPrivate(@Payload Message message) {
        msgTemplate.convertAndSendToUser(message.getSenderName(),"/private",message);
        return message;
    }
}
