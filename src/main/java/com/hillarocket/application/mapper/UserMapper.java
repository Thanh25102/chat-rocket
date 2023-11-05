package com.hillarocket.application.mapper;

import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserMapper {
    public UserDto mapToDto(User user) {
        return new UserDto(user.getId(), user.getFullName(), user.getEmail());
    }
}
