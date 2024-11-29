import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers"

export async function middleware(request: NextRequest) {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (!refreshToken){
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/api/:path*"],
};