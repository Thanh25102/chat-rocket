package com.hillarocket.application.handler.i;

import org.springframework.web.multipart.MultipartFile;

public interface EmailService {
    void sendMail(MultipartFile[] file,  String[] cc, String subject, String body);
}
