import { NextRequest, NextResponse } from "next/server";
import { PropertyRepository } from "@/lib/repositories/property.repo";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession();
    if (session && !can(session, "property:reject")) {
      return NextResponse.json({ success: false, error: "FORBIDDEN: Bạn không có quyền từ chối tin" }, { status: 403 });
    }

    let reason = "Không đạt yêu cầu kiểm duyệt";
    try {
      const body = await req.json();
      if (body.reason) reason = body.reason;
    } catch (e) {}

    const updated = await PropertyRepository.updateStatusWithReason(
      params.id,
      "REJECTED",
      reason,
      session ? { id: session.userId, name: session.name } : undefined
    );
    return NextResponse.json({ success: true, data: updated, message: "Đã từ chối tin đăng" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
