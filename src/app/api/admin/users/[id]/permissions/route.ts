import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/repositories/user.repo";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (session && !can(session, "system:manage_roles")) {
      return NextResponse.json({ success: false, error: "FORBIDDEN: Chỉ SUPER_ADMIN mới có quyền phân quyền riêng" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await UserRepository.updateCustomPermissions(
      params.id,
      body.permissions || [],
      session ? { id: session.userId, name: session.name } : undefined
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
