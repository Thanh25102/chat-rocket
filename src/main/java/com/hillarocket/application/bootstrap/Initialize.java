package com.hillarocket.application.bootstrap;

import com.github.javafaker.Faker;
import com.hillarocket.application.domain.Role;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.DataSourceInitializer;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
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


    private void initUsers() {
        IntStream.range(0, 10)
                .forEach(i ->
                        userRepo.save(new User(null, faker.name().fullName(), faker.internet().emailAddress(), passwordEncoder.encode("123456"),null, null, Role.USER)
                        )
                );
    }

}
