package org.techtest.api.service;

import com.resend.core.exception.ResendException;

import java.io.IOException;

public interface EmailService {
  void sendEmail(String email, String fullName, String activationToken)
      throws IOException, ResendException;
}
