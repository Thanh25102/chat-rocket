package com.hillarocket.application.cache;

import com.hillarocket.application.dto.MessageDto;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class MessageCache {
    private final RedisTemplate<String, MessageDto> redisTemplate;

    public MessageCache(RedisTemplate<String, MessageDto> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
}
