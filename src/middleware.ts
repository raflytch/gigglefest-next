import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!token && !isAuthRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (token) {
    try {
      const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

      const { payload } = await jwtVerify(token, JWT_SECRET);

      if (payload && isAuthRoute) {
        return NextResponse.redirect(new URL("/events", request.url));
      }

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", payload.sub as string);
      requestHeaders.set("x-user-email", payload.email as string);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      if (isAuthRoute) {
        return NextResponse.next();
      }

      const url = new URL("/login", request.url);
      url.searchParams.set("from", pathname);
      url.searchParams.set("error", "Invalid or expired token");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/events",
    "/events/:path*",
    "/tickets",
    "/tickets/:path*",
    "/login",
    "/register",
  ],
};
