package org.techtest.api.util;

import jakarta.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class CookieUtil {

    public Cookie createAccessTokenCookie(String value) {
        Cookie cookie = new Cookie("accessToken", value);
        cookie.setMaxAge(60 * 60 * 3);
        cookie.setPath("/");
        cookie.setSecure(true);
        return cookie;
    }

    public Cookie createRefreshTokenCookie(String value) {
        Cookie cookie = new Cookie("refreshToken", value);
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setPath("/");
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
