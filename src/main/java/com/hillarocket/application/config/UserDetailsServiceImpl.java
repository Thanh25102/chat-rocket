package com.hillarocket.application.config;

import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserRepo userRepo;

    public UserDetailsServiceImpl(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email)  {
        var user = userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user present with email: " + email));
        return new org.springframework.security.core.userdetails.User
                (user.getEmail(), user.getPassword(), getAuthorities(user));
    }

    public List<GrantedAuthority> getAuthorities(User user) {
        return List.of(
                new SimpleGrantedAuthority("ROLE_" + user.getRole())
        );
    }
}
