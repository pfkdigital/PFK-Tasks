import {cookies} from "next/headers";
import {refreshTokens} from "@/service/token-service";
import {ResponseCookies} from "next/dist/compiled/@edge-runtime/cookies";

const getAccessToken = async () => {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
        return undefined
    }

    if (!accessToken && refreshToken) {
        console.log("Refreshing tokens");
        const response = await refreshTokens(refreshToken);

        if (!response?.ok) {
            return undefined
        }

        const setCookies = new ResponseCookies(response.headers);
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        setCookies.getAll().map((cookie) => cookieStore.set(cookie));
    }

    return accessToken
}

export default getAccessToken;