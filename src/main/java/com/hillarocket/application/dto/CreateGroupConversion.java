package com.hillarocket.application.dto;

import java.util.List;

public record CreateGroupConversion(List<String> userIds, String name) {
}
