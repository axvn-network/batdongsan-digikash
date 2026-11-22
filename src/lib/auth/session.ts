import { cookies } from "next/headers";
import { verifyToken, JWTPayload } from "./jwt";
import { can, requirePermission } from "./rbac";
import { PermissionKey } from "@/types";

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get("bds_token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function requireUser(): Promise<JWTPayload> {
  const session = await getSession();
  if (!session) {
    const error = new Error("UNAUTHORIZED: Yêu cầu đăng nhập");
    (error as unknown as { statusCode: number }).statusCode = 401;
    throw error;
  }
  return session;
}

export async function requireAdmin(): Promise<JWTPayload> {
  const session = await requireUser();
  const allowed = ["ADMIN", "SUPER_ADMIN", "MODERATOR"];
  if (!allowed.includes(session.role.toUpperCase())) {
    const error = new Error("FORBIDDEN: Bạn không có quyền truy cập trang quản trị");
    (error as unknown as { statusCode: number }).statusCode = 403;
    throw error;
  }
  return session;
}

export async function checkPermission(permission: PermissionKey): Promise<boolean> {
  const session = await getSession();
  if (!session) return false;
  return can(session, permission);
}

export async function requireServerPermission(permission: PermissionKey): Promise<JWTPayload> {
  const session = await requireUser();
  requirePermission(session, permission);
  return session;
}
