package com.hillarocket.application.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;

@BrowserCallable()
@AnonymousAllowed
public class BotEndpoint {

    @Value("${openai.model}")
    private String model;
    @Value("${openai.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;

    public BotEndpoint(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

}
