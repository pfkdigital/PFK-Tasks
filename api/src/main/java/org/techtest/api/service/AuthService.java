package org.techtest.api.service;

import com.resend.core.exception.ResendException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.techtest.api.dto.request.AuthenticateRequest;
import org.techtest.api.dto.request.ConfirmAccountRequest;
import org.techtest.api.dto.request.RegisterRequest;
import org.techtest.api.dto.response.MessageResponse;
import org.techtest.api.dto.response.TokenResponse;
import org.techtest.api.dto.response.UserResponse;

import java.io.IOException;

public interface AuthService {
  void register(RegisterRequest registerRequest) throws IOException, ResendException;

  void activateAccount(ConfirmAccountRequest confirmAccountRequest);

  void resendActivationToken(String activationCode) throws IOException, ResendException;

  UserResponse authenticate(AuthenticateRequest authenticateRequest, HttpServletResponse response);

  HttpServletResponse refresh(HttpServletRequest request, HttpServletResponse response);

  MessageResponse logout(HttpServletRequest request);
}
