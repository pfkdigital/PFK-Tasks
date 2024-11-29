package org.techtest.api.oauth2;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.response.TokenResponse;
import org.techtest.api.entity.User;
import org.techtest.api.enums.AuthProvider;
import org.techtest.api.enums.Role;
import org.techtest.api.repository.UserRepository;
import org.techtest.api.service.JwtService;
import org.techtest.api.util.CookieUtil;

import java.io.IOException;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class Oauth2SuccessHandler implements AuthenticationSuccessHandler {

  @Value("${cors.allowed.origins}")
  private String allowedOrigins;

  private final CookieUtil cookieUtil;
  private final JwtService jwtService;
  private final UserRepository userRepository;

  @Override
  public void onAuthenticationSuccess(
      HttpServletRequest request, HttpServletResponse response, Authentication authentication)
      throws IOException {
    OAuth2AuthenticationToken token = (OAuth2AuthenticationToken) authentication;
    OAuth2User oAuth2User = token.getPrincipal();
    String authProvider = token.getAuthorizedClientRegistrationId();

    User oauthUser = null;

    if (authProvider.equals("google")) {
      oauthUser = processOauth2Google(oAuth2User.getAttributes());
    } else if (authProvider.equals("github")) {
      oauthUser = processOauth2Github(oAuth2User.getAttributes());
    }

    assert oauthUser != null;
    Optional<User> savedUser = userRepository.findByUsername(oauthUser.getUsername());

    if (savedUser.isEmpty()) {
      userRepository.save(oauthUser);
    }

    if (savedUser.isPresent()) {
      User user = savedUser.get();
      user.setDisplayImageUrl(oauthUser.getDisplayImageUrl());
      user.setProvider(oauthUser.getProvider());
      user.setRole(oauthUser.getRole());
      user.setEmail(oauthUser.getEmail());
      userRepository.save(user);
    }

    SecurityContextHolder.getContext().setAuthentication(authentication);
    TokenResponse tokens = generateJwtTokens(oauthUser);

    Cookie accessTokenCookie = cookieUtil.createAccessTokenCookie(tokens.getAccessToken());

    response.addCookie(accessTokenCookie);
    response.sendRedirect(allowedOrigins + "/dashboard");
  }

  private User processOauth2Google(Map<String, Object> attributes) {
    String email = (String) attributes.get("email");
    String firstName = (String) attributes.get("given_name");
    String lastName = (String) attributes.get("family_name");
    String picture = (String) attributes.get("picture");
    String username = email.split("@")[0];

    return buildUser(email, username, picture, AuthProvider.GOOGLE.name());
  }

  private User processOauth2Github(Map<String, Object> attributes) {
    String email = (String) attributes.get("email");
    String nameParts = (String) attributes.get("name");
    String firstName = nameParts.split(" ")[0];
    String lastName = nameParts.split(" ")[1];
    String username = (String) attributes.get("login");
    String picture = (String) attributes.get("avatar_url");

    return buildUser(email, username, picture, AuthProvider.GITHUB.name());
  }

  private User buildUser(
      String email,
      String username,
      String picture,
      String provider) {
    return User.builder()
        .username(username)
        .email(email)
        .displayImageUrl(picture)
        .provider(provider)
        .isEnabled(true)
        .role(Role.ROLE_USER)
        .build();
  }

  private TokenResponse generateJwtTokens(User user) {
    String accessToken = jwtService.createAccessToken(user);
    String refreshToken = jwtService.createRefreshToken(user);

    return TokenResponse.builder().accessToken(accessToken).refreshToken(refreshToken).build();
  }
}
