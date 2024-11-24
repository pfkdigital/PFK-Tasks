import { NextResponse } from "next/server";
import { ApiError } from "@/types/api-error";
import { AUTH_LOGOUT } from "@/constants/api-endpoints";
import { cookies } from 'next/headers';

export async function GET() {
    try {
        const cookieStore = cookies();
        const accessToken = cookieStore.get("accessToken")?.value;
        const response = await fetch(AUTH_LOGOUT, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
            },
            credentials: "include",
        });

        if (!response.ok) {
            const responseError: ApiError = await response.json();
            throw new Error(responseError.message);
        }

        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: (e as Error).message }, { status: 500 });
    }
}