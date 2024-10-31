package org.techtest.api.service.impl;

import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import com.resend.services.emails.model.CreateEmailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.techtest.api.service.EmailService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

  private final Resend resend;

  @Override
  public void sendEmail(String email, String fullName, String activationToken)
      throws IOException, ResendException {
    CreateEmailResponse response = null;

    String htmlMessage = generateActivationEmail(fullName, activationToken);
    try {
      CreateEmailOptions options =
          CreateEmailOptions.builder()
              .from("noah@pfkdigital.co.uk")
              .to(email)
              .subject("Account Activation")
              .html(htmlMessage)
              .build();
      response = resend.emails().send(options);
    } catch (ResendException exception) {
      throw new RuntimeException(exception.getMessage());
    }

  }

  private String generateActivationEmail(String name, String activationCode) throws IOException {
    String template = readHtmlTemplate();
    return template
        .replace("{{name}}", name)
        .replace("{{activationCode}}", String.valueOf(activationCode));
  }

  private String readHtmlTemplate() throws IOException {
    return new String(Files.readAllBytes(Paths.get("src/main/resources/templates/new-email.html")));
  }
}
