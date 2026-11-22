import { NextRequest, NextResponse } from "next/server";
import { UserRepository } from "@/lib/repositories/user.repo";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { role } = body;
    if (!role) {
      return NextResponse.json({ success: false, error: "Thiếu vai trò" }, { status: 400 });
    }

    const updated = await UserRepository.updateRole(params.id, role);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
