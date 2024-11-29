import {cookies} from "next/headers";
import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {NextResponse} from "next/server";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";

export async function GET(req:Request) {
    const accessToken = cookies().get("accessToken")?.value
    const refreshToken = cookies().get("refreshToken")?.value

    if (!accessToken) {
        if (refreshToken) {
            const response = await fetch(AUTH_REFRESH,{
                headers: {
                    "Authorization": `Bearer ${refreshToken}`
                }
            })

            if (!response.ok) {
                console.error("Failed to refresh token")
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }

            const responseCookies = new ResponseCookies(response.headers)
            const newAccessToken = responseCookies.get("accessToken")

            if (!newAccessToken) {
                console.error("Failed to get new access token")
                return NextResponse.redirect(new URL("/sign-in", req.url));
            }

            cookies().set("accessToken", newAccessToken?.value, {
                expires: newAccessToken?.expires,
                httpOnly: true,
                path: "/",
                secure: true
            })
        }

        return NextResponse.redirect(new URL("/sign-in"))
    }

    return NextResponse.json({token: cookies().get("accessToken")?.value},{status: 200})
}