import { NextRequest, NextResponse } from "next/server";
import { PropertyRepository } from "@/lib/repositories/property.repo";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { status } = body;
    if (!status) {
      return NextResponse.json({ success: false, error: "Thiếu trường status" }, { status: 400 });
    }

    const updated = await PropertyRepository.updateStatus(params.id, status);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
