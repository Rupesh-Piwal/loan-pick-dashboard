import { NextResponse } from "next/server";
import { userService } from "@/app/services/user.services";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const { id, email: userEmail } = await userService.login(email, password);

    const accessToken = generateAccessToken(id);
    const refreshToken = generateRefreshToken(id);

    const response = NextResponse.json(
      { id, email: userEmail },
      { status: 200 },
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
