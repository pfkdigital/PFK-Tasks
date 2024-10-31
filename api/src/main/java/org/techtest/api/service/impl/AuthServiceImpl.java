package org.techtest.api.service.impl;

import com.resend.core.exception.ResendException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.techtest.api.dto.request.AuthenticateRequest;
import org.techtest.api.dto.request.ConfirmAccountRequest;
import org.techtest.api.dto.request.RegisterRequest;
import org.techtest.api.dto.response.TokenResponse;
import org.techtest.api.dto.response.UserResponse;
import org.techtest.api.entity.User;
import org.techtest.api.enums.AuthProvider;
import org.techtest.api.enums.Role;
import org.techtest.api.repository.UserRepository;
import org.techtest.api.service.AuthService;
import org.techtest.api.service.EmailService;
import org.techtest.api.service.JwtService;
import org.techtest.api.util.CookieUtil;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private final CookieUtil cookieUtil;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final EmailService emailService;
  private final AuthenticationManager authenticationManager;

  @Override
  public void register(RegisterRequest registerRequest) throws IOException, ResendException {
    String activationToken = generateRegistrationCode();

    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      throw new RuntimeException("Username is already taken");
    }

    if (userRepository.existsByEmail(registerRequest.getEmail())) {
      throw new RuntimeException("Email is already taken");
    }

    User newUser =
        User.builder()
            .username(registerRequest.getUsername())
            .password(passwordEncoder.encode(registerRequest.getPassword()))
            .email(registerRequest.getEmail())
            .firstname(registerRequest.getFirstname())
            .lastname(registerRequest.getLastname())
            .role(Role.ROLE_USER)
            .provider(AuthProvider.CREDENTIALS.name())
            .isEnabled(false)
            .activationToken(activationToken)
            .activationTokenExpiryDate(LocalDate.now().plusDays(1))
            .build();

    User savedUser = userRepository.save(newUser);

    emailService.sendEmail(savedUser.getEmail(), savedUser.getName(), activationToken);
  }

  public void activateAccount(ConfirmAccountRequest confirmAccountRequest) {
    Optional<User> user =
        userRepository.findUserByActivationToken(confirmAccountRequest.getActivationCode());

    if (user.isEmpty()) {
      throw new RuntimeException("Activation token is invalid");
    }

    if (LocalDate.now().isAfter(user.get().getActivationTokenExpiryDate())) {
      throw new RuntimeException("Activation token is expired");
    }

    user.get().setEnabled(true);
    user.get().setActivationToken(null);
    user.get().setActivationTokenExpiryDate(null);

    userRepository.save(user.get());
  }

  @Override
  public void resendActivationToken(String activationCode)
      throws IOException, RuntimeException, ResendException {
    Optional<User> user = userRepository.findUserByActivationToken(activationCode);

    if (user.isEmpty()) {
      throw new RuntimeException("Activation token is invalid");
    }
    String activationToken = generateRegistrationCode();

    user.get().setActivationToken(activationToken);
    user.get().setActivationTokenExpiryDate(LocalDate.now().plusDays(1));

    User updatedUser = userRepository.save(user.get());

    emailService.sendEmail(updatedUser.getEmail(), updatedUser.getName(), activationToken);
  }

  @Override
  public UserResponse authenticate(
      AuthenticateRequest authenticateRequest, HttpServletResponse response) {

    Optional<User> userOptional = userRepository.findByUsername(authenticateRequest.getUsername());

    if (userOptional.isEmpty()) {
      throw new UsernameNotFoundException("User not found");
    }

    var auth =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                authenticateRequest.getUsername(), authenticateRequest.getPassword()));

    User user = (User) auth.getPrincipal();

    var tokens = generateJwtTokens(user);

    Cookie accessTokenCookie = cookieUtil.createAccessTokenCookie(tokens.getAccessToken());
    Cookie refreshTokenCookie = cookieUtil.createRefreshTokenCookie(tokens.getRefreshToken());

    response.addCookie(accessTokenCookie);
    response.addCookie(refreshTokenCookie);

    return UserResponse.builder()
        .username(user.getUsername())
        .email(user.getEmail())
        .displayImageUrl(user.getDisplayImageUrl())
        .build();
  }

  @Override
  public HttpServletResponse refresh(HttpServletRequest request, HttpServletResponse response) {
    String authHeader = request.getHeader("Authorization");
    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
      throw new RuntimeException("Refresh token is missing");
    }
    String jwtToken = authHeader.substring(7);
    String username = jwtService.extractUsername(jwtToken);

    if (username == null) {
      throw new RuntimeException("Invalid token");
    }

    User userDetails =
        userRepository
            .findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

    if (jwtService.validateToken(jwtToken, userDetails)) {
      TokenResponse tokens = generateJwtTokens(userDetails);

      response.addCookie(cookieUtil.createAccessTokenCookie(tokens.getAccessToken()));
      response.addCookie(cookieUtil.createRefreshTokenCookie(tokens.getRefreshToken()));
      return response;
    } else {
      throw new RuntimeException("Invalid token");
    }
  }

  private String generateRegistrationCode() {
    Random random = new Random();

    return String.valueOf(100000 + random.nextInt(900000));
  }

  private TokenResponse generateJwtTokens(User user) {
    String accessToken = jwtService.createAccessToken(user);
    String refreshToken = jwtService.createRefreshToken(user);
    String accessTokenExpiration = jwtService.extractExpiration(accessToken).toString();
    String refreshTokenExpiration = jwtService.extractExpiration(refreshToken).toString();

    return TokenResponse.builder()
        .accessToken(accessToken)
        .refreshToken(refreshToken)
        .accessTokenExpiration(accessTokenExpiration)
        .refreshTokenExpiration(refreshTokenExpiration)
        .build();
  }
}
