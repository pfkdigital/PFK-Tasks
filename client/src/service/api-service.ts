import getAccessToken from "@/util/get-access-token";
import {ApiError} from "@/types/api-error";
import {HttpMethod} from "@/util/http-mehod-enum";
import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";

export const apiService = async (url: string, method: HttpMethod, body: BodyInit | null | undefined) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        console.log("Refreshing tokens");
        const response = await fetch(AUTH_REFRESH,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies().get("refreshToken")?.value}`
            },
        })

        if (!response.ok) {
            return undefined
        }

        const responseCookie = new ResponseCookies(response.headers);
        const refreshedAccessTokenCookie = responseCookie.get("accessToken");

        if (!refreshedAccessTokenCookie) {
            return undefined
        }
        cookies().set("accessToken", refreshedAccessTokenCookie.value, {
            httpOnly: true,
            expires: refreshedAccessTokenCookie.expires,
            path: "/",
            secure: true
        })
        console.log("Tokens refreshed");
    }

    const requestHeaders = new Headers();
    requestHeaders.set("Content-Type", "application/json");
    requestHeaders.set("Authorization", `Bearer ${accessToken}`);

    try {
        const originalRequest = new Request(url, {
            method: method,
            headers: requestHeaders,
            body: body,
            redirect: 'manual',
            credentials: 'include',
        });

        const response = await fetch(originalRequest);

        if (!response.ok) {
            const apiError: ApiError = await response.json();
            return new Error(apiError.message);
        }

        return await response.json();
    } catch (e) {
        console.error(e)
    }
}