import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const isAuthenticated = !!token;
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  if (!isAuthenticated && !isAuthRoute) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/events", request.url));
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
