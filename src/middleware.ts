import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Lightweight Edge-compatible JWT parser for Next.js Middleware
function parseJwtEdge(token: string) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const decoded = JSON.parse(jsonPayload);
    // Check expiration
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }
    return decoded;
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("bds_token")?.value;

  // Protect Admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      const url = new URL("/dang-nhap", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    const decoded = parseJwtEdge(token);
    const adminRoles = ["ADMIN", "SUPER_ADMIN", "MODERATOR"];
    if (!decoded || !adminRoles.includes((decoded.role || "").toUpperCase())) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect User Dashboard routes
  if (pathname.startsWith("/tai-khoan") || pathname.startsWith("/dang-tin")) {
    if (!token) {
      const url = new URL("/dang-nhap", request.url);
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
    const decoded = parseJwtEdge(token);
    if (!decoded) {
      return NextResponse.redirect(new URL("/dang-nhap", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/tai-khoan/:path*",
    "/dang-tin/:path*",
  ],
};
