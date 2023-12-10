package com.hillarocket.application.bootstrap;

import com.github.javafaker.Faker;
import com.hillarocket.application.domain.Role;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.stream.IntStream;

@Component
public class Initialize implements CommandLineRunner {
    private final UserRepo userRepo;
    private final Faker faker;
    private final PasswordEncoder passwordEncoder;

    public Initialize(UserRepo userRepo, Faker faker, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.faker = faker;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepo.findAll().isEmpty()) initUsers();
    }


    private static final String DEFAULT_PASSWORD = "123456";

    private void initUsers() {
        IntStream.range(0, 10)
                .forEach(i -> saveUserWithDefaultValues());
    }

    private void saveUserWithDefaultValues() {
        User user = User.builder()
                .fullName(faker.name().fullName())
                .email(faker.internet().emailAddress())
                .password(passwordEncoder.encode(DEFAULT_PASSWORD))
                .role(Role.USER)
                .build();
        userRepo.save(user);
    }
}
