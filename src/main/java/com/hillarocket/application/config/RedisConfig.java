package com.hillarocket.application.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.hillarocket.application.domain.Message;
import com.hillarocket.application.dto.MessageDto;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;

@Configuration
public class RedisConfig {
    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        // Tạo Standalone Connection tới Redis
        var redisConfig = new RedisStandaloneConfiguration("localhost", 6379);
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
