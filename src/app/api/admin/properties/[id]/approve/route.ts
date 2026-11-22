import { NextRequest, NextResponse } from "next/server";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (session && !can(session, "property:approve")) {
      return NextResponse.json({ success: false, error: "FORBIDDEN: Bạn không có quyền duyệt tin" }, { status: 403 });
    }

    const updated = await PropertyRepository.updateStatusWithReason(
      params.id,
      "APPROVED",
      "Quản trị viên phê duyệt",
      session ? { id: session.userId, name: session.name } : undefined
    );
    return NextResponse.json({ success: true, data: updated, message: "Đã duyệt tin đăng thành công" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
