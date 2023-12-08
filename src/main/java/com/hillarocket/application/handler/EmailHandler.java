package com.hillarocket.application.handler;

import dev.hilla.exception.EndpointException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Service
public class EmailHandler  {
    private final JavaMailSender javaMailSender;

    public EmailHandler(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Value("${spring.mail.username}")
    private String fromEmail;


    public void sendMail(MultipartFile[] file,String to, String[] cc, String subject, String body) {
            try {
                var mimeMessage = javaMailSender.createMimeMessage();
                var mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

                mimeMessageHelper.setFrom(fromEmail);
                mimeMessageHelper.setTo(to);
                if (cc != null && cc.length > 0) mimeMessageHelper.setCc(cc);
                mimeMessageHelper.setSubject(subject);
                mimeMessageHelper.setText(body);

                if (file != null) {
                    for (MultipartFile multipartFile : file) {
                        mimeMessageHelper.addAttachment(
                                Objects.requireNonNull(multipartFile.getOriginalFilename()),
                                new ByteArrayResource(multipartFile.getBytes()));
                    }
                }
                javaMailSender.send(mimeMessage);
            } catch (Exception e) {
                throw new EndpointException("Some things went wrong, please resend the code.");
            }
    }
}
