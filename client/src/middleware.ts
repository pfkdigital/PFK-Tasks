// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const DASHBOARD_PATH = /^\/dashboard(\/.*)?$/;
    const API_PATH = /^\/api(\/.*)?$/;
    console.log(request.nextUrl.pathname);
    if (DASHBOARD_PATH.test(request.nextUrl.pathname) || API_PATH.test(request.nextUrl.pathname)) {
        const accessToken = request.cookies.get("accessToken")?.value;
        const refreshToken = request.cookies.get("refreshToken")?.value;

        if (!accessToken || !refreshToken) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
    }

    return NextResponse.next(); // Default response if no conditions are met
}

export const config = {
    matcher: ['/dashboard/:path*', '/api/:path*'],
};
