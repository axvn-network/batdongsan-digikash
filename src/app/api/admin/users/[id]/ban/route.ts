import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/repositories/user.repo";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (session && !can(session, "user:ban")) {
      return NextResponse.json({ success: false, error: "FORBIDDEN: Không có quyền khóa tài khoản" }, { status: 403 });
    }

    const body = await req.json().catch(() => ({}));
    const updated = await UserRepository.toggleBlock(
      params.id,
      body.reason,
      session ? { id: session.userId, name: session.name } : undefined
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
