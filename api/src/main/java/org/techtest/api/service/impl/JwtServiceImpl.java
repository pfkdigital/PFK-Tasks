package org.techtest.api.service.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.techtest.api.service.JwtService;

import javax.crypto.SecretKey;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

    @Value("${security.jwt.secret}")
    private String secretKey;

    @Value("${security.jwt.expiration}")
    private long accessTokenExpireTime;

    @Value("${security.jwt.refresh.expiration}")
    private long refreshTokenExpireTime;

    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    private String buildToken(
            UserDetails userDetails, Date expirationTime, Map<String, Object> claims) {
        var authorities = userDetails.getAuthorities();

        return Jwts.builder()
                .claims(claims)
                .claim("authorities", authorities)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(expirationTime)
                .signWith(getSignInKey())
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().verifyWith(getSignInKey()).build().parseSignedClaims(token).getPayload();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    @Override
    public String createAccessToken(UserDetails userDetails) {
        return buildToken(userDetails, calculateExpiryDateAccessToken(), Map.of());
    }

    @Override
    public String createRefreshToken(UserDetails userDetails) {
        return buildToken(userDetails, calculateExpiryDateRefreshToken(), Map.of());
    }

    @Override
    public boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        return expiration.before(new Date(System.currentTimeMillis()));
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    private Date calculateExpiryDate(int field, int amount) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(field, amount);
        return cal.getTime();
    }

    private Date calculateExpiryDateAccessToken() {
        return calculateExpiryDate(Calendar.HOUR, 3);
    }

    private Date calculateExpiryDateRefreshToken() {
        return calculateExpiryDate(Calendar.DATE, 1);
    }
}
