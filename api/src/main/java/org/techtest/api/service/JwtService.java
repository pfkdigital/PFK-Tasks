package org.techtest.api.service;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface JwtService {
  String extractUsername(String token);

  Date extractExpiration(String token);

  String createAccessToken(UserDetails userDetails);

  String createRefreshToken(UserDetails userDetails);

  boolean isTokenExpired(String token);

  boolean validateToken(String token, UserDetails userDetails);
}
