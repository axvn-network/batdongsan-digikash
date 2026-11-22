import { NextRequest, NextResponse } from "next/server";
import { InquiryRepository } from "@/lib/repositories/inquiry.repo";
import { inquirySchema } from "@/lib/validators/inquiry";
import { NotificationService } from "@/lib/services/notification.service";

export async function GET() {
  try {
    const list = await InquiryRepository.getAll();
    return NextResponse.json({ success: true, data: list });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = inquirySchema.parse(body);

    const created = await InquiryRepository.create({
      propertyId: validated.propertyId,
      propertyTitle: body.propertyTitle,
      senderName: validated.senderName,
      senderPhone: validated.senderPhone,
      senderEmail: validated.senderEmail || undefined,
      message: validated.message,
    });

    await NotificationService.sendInquiryNotification(
      created.senderName,
      created.senderPhone,
      created.propertyTitle || ""
    );

    return NextResponse.json({ success: true, data: created });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Không thể gửi liên hệ" },
      { status: 400 }
    );
  }
}
