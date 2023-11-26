package com.hillarocket.application.config;

import com.hillarocket.application.domain.Role;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;

import java.io.IOException;

public class OAuth2LoginHandler extends SavedRequestAwareAuthenticationSuccessHandler {

    @Value("${homepage.url}")
    private String homePageUrl;

    private final UserDetailsServiceImpl userDetailsService;
    private final UserRepo userRepo;

    public OAuth2LoginHandler(UserDetailsServiceImpl userDetailsService, UserRepo userRepo) {
        this.userDetailsService = userDetailsService;
        this.userRepo = userRepo;
    }


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws ServletException, IOException {

        var oauthToken = (OAuth2AuthenticationToken) authentication;

        if("github".equals(oauthToken.getAuthorizedClientRegistrationId())){
            var principal = (DefaultOAuth2User) authentication.getPrincipal();
            var attributes = principal.getAttributes();
            String email = attributes.getOrDefault("email","").toString();
            String name = attributes.getOrDefault("name","").toString();
            try{
                var user =  userDetailsService.loadUserByUsername(email);
                var newUser = new DefaultOAuth2User(user.getAuthorities(),attributes,"name");
                var securityAuth = new OAuth2AuthenticationToken(newUser,user.getAuthorities(),"id");
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            }catch (UsernameNotFoundException e){
                var user = User.builder()
                        .fullName(name).email(email).role(Role.USER).build();
                userRepo.save(user);

                var newUser = new DefaultOAuth2User(userDetailsService.getAuthorities(user),attributes,"name");
                var securityAuth = new OAuth2AuthenticationToken(newUser,userDetailsService.getAuthorities(user),"id");
                SecurityContextHolder.getContext().setAuthentication(securityAuth);
            }

        }
        this.setAlwaysUseDefaultTargetUrl(true);
        this.setDefaultTargetUrl(homePageUrl);
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
