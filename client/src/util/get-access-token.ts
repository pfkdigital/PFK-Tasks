"use server"

import {cookies} from "next/headers";
import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";


const getAccessToken = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
        return undefined
    }

    if (!accessToken && refreshToken) {
        const response = await fetch(AUTH_REFRESH,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            },
        })

        if (!response.ok) {
            return undefined
        }

        const refreshedCookie = new ResponseCookies(response.headers)
        const refreshedAccessCookie = refreshedCookie.get("accessToken")

        if (!refreshedAccessCookie){
            return undefined
        }

        cookieStore.set("accessToken", refreshedAccessCookie?.value,{
            expires: refreshedAccessCookie?.expires,
            httpOnly: true,
            path: "/",
            secure: true,
        })
    }

    return cookieStore.get("accessToken")?.value;
}

export default getAccessToken;