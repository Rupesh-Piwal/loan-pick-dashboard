import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET!;

type JwtPayload = {
  userId: string;
};

export function generateAccessToken(userId: string) {
  return jwt.sign({ userId }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
}

export function generateRefreshToken(userId: string) {
  return jwt.sign({ userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, ACCESS_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, REFRESH_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}
