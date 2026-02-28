import { NextResponse } from "next/server";
import { generateAccessToken, generateRefreshToken } from "@/lib/jwt";
import { userService } from "@/app/services/user.services";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await userService.login(email, password);

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    const response = NextResponse.json({ accessToken }, { status: 200 });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // change to true in production
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
