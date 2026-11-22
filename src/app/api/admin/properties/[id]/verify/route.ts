import { NextResponse } from "next/server";
import { PropertyRepository } from "@/lib/repositories/property.repo";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));
    const property = await PropertyRepository.toggleVerification(params.id, body.isVerified);
    if (!property) {
      return NextResponse.json({ error: "Không tìm thấy bất động sản" }, { status: 404 });
    }
    return NextResponse.json({
      success: true,
      isVerified: Boolean(property.isVerified || property.verification?.isVerified),
      verifiedAt: property.verifiedAt || property.verification?.verifiedAt,
      message: (property.isVerified || property.verification?.isVerified)
        ? "Đã cấp huy hiệu Sổ đỏ xác thực"
        : "Đã hủy xác thực",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Lỗi server" }, { status: 500 });
  }
}
