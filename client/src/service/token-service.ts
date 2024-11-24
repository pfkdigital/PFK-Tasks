import {AUTH_REFRESH} from "@/constants/api-endpoints";
import {jwtVerify} from "jose";
import {TokenVerificationResult} from "@/types/token-verification-result";

export const refreshTokens = async (refreshToken: string)=> {
    try {
        const response = await fetch(AUTH_REFRESH, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${refreshToken}`,
            },
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        return response;
    } catch (error) {
        console.error(error);
    }
};

export const verifyToken = async (
    accessToken: string,
    secretKey: string
): Promise<TokenVerificationResult> => {
    const encoder = new TextEncoder();
    const encodedSecretKey = encoder.encode(secretKey);

    return jwtVerify(accessToken, encodedSecretKey);
};