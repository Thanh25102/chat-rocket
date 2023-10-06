package com.hillarocket.application.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatGptResponse {
    private String model;
    private List<Choice> choices;
    public record Choice(Integer index,Message message) {}

    public ChatGptResponse(String model) {
        this.model = model;
    }
}
