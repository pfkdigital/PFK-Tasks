import {cookies} from "next/headers";
import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {ApiError} from "@/types/api-error";

export async function POST() {
    const cookieStore = cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    try {
        const response = await fetch(AUTH_REFRESH,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        })

        if (!response.ok) {
            const error: ApiError = await response.json();
            throw new Error(error.message);
        }

        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return response
    } catch (e) {

    }
}