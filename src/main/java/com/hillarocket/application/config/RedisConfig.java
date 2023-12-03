package com.hillarocket.application.config;

import com.hillarocket.application.dto.MessageDto;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

@Configuration
public class RedisConfig {
    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        // Tạo Standalone Connection tới Redis
        var redisConfig = new RedisStandaloneConfiguration("cache", 6379);
//        var redisConfig = new RedisStandaloneConfiguration("local", 6379);
        redisConfig.setPassword("eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81");
        return new LettuceConnectionFactory(redisConfig);
    }

    @Bean
    public RedisTemplate<String, MessageDto> redisTemplate() {
        var redisTemplate = new RedisTemplate<String, MessageDto>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        return redisTemplate;
    }

}
