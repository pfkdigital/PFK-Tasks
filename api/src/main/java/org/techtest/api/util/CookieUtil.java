package org.techtest.api.util;


import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {
    @Value("${security.jwt.expiration}")
    private long accessTokenExpireTime;

    @Value("${security.jwt.refresh.expiration}")
    private long refreshTokenExpireTime;

    public Cookie createAccessTokenCookie( String value) {
        Cookie cookie = new Cookie("accessToken", value);
        cookie.setMaxAge((int) accessTokenExpireTime);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie createRefreshTokenCookie(String value) {
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setMaxAge((int) refreshTokenExpireTime);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }
}
