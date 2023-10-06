package com.hillarocket.application.endpoint;

import com.hillarocket.application.dto.ChatGptRequest;
import com.hillarocket.application.dto.ChatGptResponse;
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

    public String chat(String prompt) throws Exception {
        System.out.println("prompt: " + prompt);
        var request = new ChatGptRequest(model,prompt);
        var response = restTemplate.postForObject(apiUrl,request,ChatGptResponse.class);
        if(response== null) throw new Exception("Could not call api");
        return response.getChoices().get(0).message().getContent();
    }
}
