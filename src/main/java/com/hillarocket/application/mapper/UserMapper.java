package com.hillarocket.application.mapper;

import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.UserDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toUserDto(User user);
}
