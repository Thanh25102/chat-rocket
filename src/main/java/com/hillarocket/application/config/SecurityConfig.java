package com.hillarocket.application.config;

import com.hillarocket.application.handler.CustomOidcUserHandler;
import com.vaadin.flow.spring.security.VaadinWebSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends VaadinWebSecurity {

//    @Value("${my.app.auth.secret}")
//    private String authSecret;

    public SecurityConfig(CustomOidcUserHandler customOidcUserHandler) {
        this.customOidcUserHandler = customOidcUserHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    private final CustomOidcUserHandler customOidcUserHandler;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Disable creating and using sessions in Spring Security
//        http.csrf(AbstractHttpConfigurer::disable)
//                .sessionManagement(customizer -> customizer.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.authorizeHttpRequests(
                authorize -> {
                    authorize.requestMatchers(
                            new AntPathRequestMatcher("/images/*.png", "/line-awesome/**/*.svg"),
                            new AntPathRequestMatcher("/videos/*.mp4"),
                            new AntPathRequestMatcher("/icons/*.png"),
                            new AntPathRequestMatcher("/ws/**"),
                            new AntPathRequestMatcher("/**"),
                            new AntPathRequestMatcher("/oauth2/authorization/github")
                    ).permitAll();
                });
        super.configure(http);

        http.oauth2Login(oauth2 ->
                oauth2.loginPage("/login").permitAll()
                        .userInfoEndpoint(userInfo -> userInfo.oidcUserService(customOidcUserHandler))
        );

        http.logout(logout -> logout.logoutSuccessUrl("/login").permitAll());


        // Register your login view to the view access checker mechanism
        setLoginView(http, "/login");

//        // Enable stateless authentication
//        setStatelessAuthentication(http,
//                new SecretKeySpec(Base64.getDecoder().decode(authSecret), JwsAlgorithms.HS256),
//                "com.hillarocket.application"
//        );
    }

}