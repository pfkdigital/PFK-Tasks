package org.techtest.api.util;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    public Cookie createAccessTokenCookie(String value) {
        Cookie cookie = new Cookie("accessToken", value);
        cookie.setMaxAge(3 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie createRefreshTokenCookie(String value) {
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        return cookie;
    }

    public void clearCookies(Cookie[] cookies) {
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("accessToken") || cookie.getName().equals("refreshToken")) {
                cookie.setValue("");
                cookie.setMaxAge(0);
                cookie.setPath("/");
            }
        }
    }
}
