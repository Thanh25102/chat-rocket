package com.hillarocket.application.handler;

import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.BrowserCallable;
import dev.hilla.Nullable;
import dev.hilla.crud.CrudRepositoryService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.UUID;

@BrowserCallable
@AnonymousAllowed
public class UserManageHandler extends CrudRepositoryService<User, UUID, UserRepo> {
    private final PasswordEncoder passwordEncoder;

    public UserManageHandler(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public @Nullable User save(User value) {
        value.setPassword(passwordEncoder.encode("123456"));
        return super.save(value);
    }

    @Override
    public List<User> saveAll(Iterable<User> values) {
        values.forEach(value -> value.setPassword(passwordEncoder.encode("123456")));
        return super.saveAll(values);
    }
}
