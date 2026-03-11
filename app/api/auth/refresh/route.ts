import { generateAccessToken, verifyRefreshToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return Response.json({ message: "No refresh token" }, { status: 401 });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return Response.json(
        { message: "Invalid refresh token" },
        { status: 403 },
      );
    }

    const newAccessToken = generateAccessToken(decoded.userId);

    cookieStore.set("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    return Response.json({ message: "Token refreshed" });
  } catch (err) {
    return Response.json({ message: "Invalid refresh token" }, { status: 403 });
  }
}
