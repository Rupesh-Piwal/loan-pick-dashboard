import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  // If no token → redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, ACCESS_SECRET);
    return NextResponse.next(); // allow request
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/((?!login|register).*)",
    "/products/:path*",
    "/api/products/:path*",
  ],
};
