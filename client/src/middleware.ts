import { NextRequest, NextResponse } from "next/server";
import { refreshTokens, verifyToken } from "./service/token-service";

export async function middleware(request: NextRequest, response: NextResponse) {
  const DASHBOARD_PATH = /^\/dashboard(\/.*)?$/;
  const API_PATH = /^\/api(\/.*)?$/;

  if (DASHBOARD_PATH.test(request.nextUrl.pathname) || API_PATH.test(request.nextUrl.pathname)) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    try {
      const { payload: { exp } } = await verifyToken(accessToken, process.env.NEXT_PUBLIC_JWT_SECRET as string);

      if (exp && exp * 1000 < Date.now()) {
        const response = await refreshTokens(refreshToken);

        if (!response?.ok) {
          return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        console.log("Token refreshed");
        return NextResponse.next();
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  }



  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};