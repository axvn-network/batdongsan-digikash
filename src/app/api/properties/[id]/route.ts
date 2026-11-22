import { NextRequest, NextResponse } from "next/server";
import { PropertyService } from "@/lib/services/property.service";
import { PropertyRepository } from "@/lib/repositories/property.repo";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const property = await PropertyService.getPropertyDetail(params.id);
    if (!property) {
      return NextResponse.json({ success: false, error: "Không tìm thấy bất động sản" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: property });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await PropertyRepository.updateStatus(params.id, "HIDDEN");
    return NextResponse.json({ success: true, message: "Đã xóa tin đăng" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
