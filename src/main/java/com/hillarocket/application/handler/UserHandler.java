package com.hillarocket.application.handler;

import com.hillarocket.application.domain.Role;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.dto.OnlineEvent;
import com.hillarocket.application.dto.UserDto;
import com.hillarocket.application.enumration.UserStatus;
import com.hillarocket.application.mapper.UserMapper;
import com.hillarocket.application.repo.UserRepo;
import dev.hilla.exception.EndpointException;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.ThreadLocalRandom;
import java.util.concurrent.TimeUnit;

@Service
public class UserHandler {

    public final Sinks.Many<OnlineEvent> userOnlineSink;
    public final Flux<OnlineEvent> userOnlineFlux;

    public static final Set<String> usersOnline = new HashSet<>();
    private final UserRepo userRepo;
    private final EmailHandler emailHandler;
    private final PasswordEncoder passwordEncoder;
    private final RedisTemplate<String, String> redisTemplate;

    private final UserMapper userMapper;


    public UserHandler(UserRepo userRepo, EmailHandler emailHandler, PasswordEncoder passwordEncoder, RedisTemplate<String, String> redisTemplate, UserMapper userMapper) {
        this.emailHandler = emailHandler;
        this.redisTemplate = redisTemplate;
        this.userMapper = userMapper;
        userOnlineSink = Sinks.many().multicast().directBestEffort();
        userOnlineFlux = userOnlineSink.asFlux();
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserDto> findByEmail(String email) {
        return userRepo.findByEmail(email).map(userMapper::toUserDto);
    }

    public User register(User user) {
        var opl = userRepo.findByEmail(user.getEmail());
        if (opl.isPresent()) throw new EndpointException("Email is already registered");
        return opl.orElseGet(() -> {
            user.setRole(Role.USER);
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            return userRepo.save(user);
        });
    }

    public void changePassword(String email, String newPassword) {
        var opl = userRepo.findByEmail(email);
        if (opl.isEmpty()) throw new EndpointException("Email isn't exist.");
        opl.ifPresent(user -> {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepo.save(user);
        });
    }

    public List<User> getAll() {
        return userRepo.findAll();
    }

    public List<User> searchUser(String searchKey) {
        return userRepo.findByFullNameOrEmail(searchKey);
    }

    public List<String> getUsersOnline() {
        return usersOnline.stream().toList();
    }

    public Flux<OnlineEvent> join() {
        return userOnlineFlux;
    }

    public void send(OnlineEvent event) {
        if (event.status() == UserStatus.ONLINE)
            usersOnline.add(event.userId());
        else
            usersOnline.remove(event.userId());
        userOnlineSink.emitNext(event,
                (signalType, emitResult) -> emitResult == Sinks.EmitResult.FAIL_NON_SERIALIZED
        );
    }

    public void recoverAccount(String email) {
        var subject = """
                Mã xác thực khôi phục tài khoản ChatRocket
                """;
        var code = ThreadLocalRandom.current().nextInt(100000, 900000);
        var body = " Mã xác thực của bạn là : " + code;
        emailHandler.sendMail(null, email, null, subject, body);
        var ops = redisTemplate.opsForValue();
        ops.set(email, String.valueOf(code), 60, TimeUnit.SECONDS);
    }

    public boolean verifyCode(String email, String code) {
        var codeInRedis = redisTemplate.opsForValue().get(email);
        return code != null && code.equals(codeInRedis);
    }
}
