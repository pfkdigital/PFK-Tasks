import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {

    try {
        const refreshToken = request.headers.get('Authorization')?.split(' ')[1]

        const response = await fetch(AUTH_REFRESH, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${refreshToken}`
            }
        })

        if (!response.ok) {
            NextResponse.json({message: `${refreshToken}`}, {status: 402})
        }

        const newAccessToken = response.headers.getSetCookie().find((cookie) => cookie.includes('accessToken'))

        if (!newAccessToken) {
            NextResponse.json({message: 'Failed to refresh token'}, {status: 402})
        }

        const res = NextResponse.json({message: 'Token refreshed'});

        res.headers.set('Set-Cookie', `${newAccessToken}`);

        return res
    } catch (error) {
        NextResponse.json({message: error}, {status: 402})
    }
}