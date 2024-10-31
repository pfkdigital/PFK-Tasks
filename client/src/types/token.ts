export interface TokenType {
    username: string;
    email: string;
    displayImageUrl: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpiry: number;
    refreshTokenExpiry: number;
}