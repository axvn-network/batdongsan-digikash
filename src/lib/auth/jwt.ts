import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "batdongsan_jwt_secret_production_ready_key_123456";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "batdongsan_jwt_refresh_secret_production_key_789012";

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export function signAccessToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function signRefreshToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}
