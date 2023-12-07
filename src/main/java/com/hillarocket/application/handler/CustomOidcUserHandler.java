package com.hillarocket.application.handler;

import com.hillarocket.application.domain.Role;
import com.hillarocket.application.domain.User;
import com.hillarocket.application.repo.UserRepo;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOidcUserHandler extends OidcUserService {

    private final UserRepo userRepo;

    public CustomOidcUserHandler(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        var oidcUser = super.loadUser(userRequest);
        try {
            return processOidcUser(userRequest, oidcUser);
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OidcUser processOidcUser(OidcUserRequest userRequest, OidcUser oidcUser) {
        var googleUserInfo = new GoogleUserInfo(oidcUser.getAttributes());
        // see what other data from userRequest or oidcUser you need
        userRepo.findByEmail(googleUserInfo.getEmail()).orElseGet(() ->
                userRepo.save(new User(googleUserInfo.getName(), googleUserInfo.getEmail(), Role.USER))
        );
        return oidcUser;
    }

    public static class GoogleUserInfo {

        private final Map<String, Object> attributes;

        public GoogleUserInfo(Map<String, Object> attributes) {
            this.attributes = attributes;
        }

        public String getId() {
            return (String) attributes.get("sub");
        }

        public String getName() {
            return (String) attributes.get("name");
        }

        public String getEmail() {
            return (String) attributes.get("email");
        }
    }
}