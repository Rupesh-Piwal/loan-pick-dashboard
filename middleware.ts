import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { verifyAccessToken } from "@/lib/jwt";

export function middleware(request: NextRequest) {
  console.log("MIDDLEWARE HIT:", request.nextUrl.pathname);
  const token = request.cookies.get("accessToken")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    verifyAccessToken(token);
    return NextResponse.next(); // allow request
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/products/:path*", "/api/products/:path*"],
};
