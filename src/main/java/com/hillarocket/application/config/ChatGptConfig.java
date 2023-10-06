package com.hillarocket.application.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ChatGptConfig {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Bean
    public RestTemplate restTemplate() {
        var restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((rq, body, execution) -> {
            rq.getHeaders().add("Authorization", "Bearer " + openaiApiKey);
            return execution.execute(rq, body);
        });
        return restTemplate;
    }
}
