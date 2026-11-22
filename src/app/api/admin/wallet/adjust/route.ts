import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/repositories/user.repo";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (session && !can(session, "wallet:adjust")) {
      return NextResponse.json({ success: false, error: "FORBIDDEN: Chỉ SUPER_ADMIN có quyền can thiệp số dư ví" }, { status: 403 });
    }

    const body = await req.json();
    const { userId, amount, reason } = body;
    if (!userId || amount === undefined || !reason) {
      return NextResponse.json({ success: false, error: "Thiếu thông tin điều chỉnh ví" }, { status: 400 });
    }

    const result = await UserRepository.adjustWallet(
      userId,
      Number(amount),
      reason,
      session ? { id: session.userId, name: session.name } : undefined
    );
    return NextResponse.json({ success: true, ...result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
