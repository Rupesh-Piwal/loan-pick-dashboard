import { NextResponse } from "next/server";
import { userService } from "@/app/services/user.services";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const {
      id,
      email: userEmail,
      token,
    } = await userService.login(email, password);

    const response = NextResponse.json(
      { id, email: userEmail },
      { status: 200 },
    );

    response.cookies.set("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
