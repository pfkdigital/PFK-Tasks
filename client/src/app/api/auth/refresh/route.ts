import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {NextResponse} from "next/server";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";
import {cookies} from "next/headers";

export async function GET(request: Request) {
    try {
        const cookieStore = cookies()
        const refreshToken = cookieStore.get("refreshToken")

        const response = await fetch(AUTH_REFRESH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            }
        })

        if (!response.ok) {
            NextResponse.json({message: "Unable to refresh token"},{status: 402})
        }

        const responseCookies = new ResponseCookies(response.headers);
        const refreshCookie = responseCookies.get("accessToken")
        console.log(refreshCookie)
        if (!refreshCookie) {
            return NextResponse.json({message: "Unable to refresh token"},{status: 402})
        }

        cookies().set("accessToken", refreshCookie?.value, {
            expires: refreshCookie.expires,
            httpOnly: true,
            path: "/",
            secure: true
        })
        return NextResponse.json({accessToken: refreshCookie.value});
    } catch (e) {
        NextResponse.json({message: "Unable to refresh token"},{status: 402})
    }
}