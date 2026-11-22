import { NextRequest, NextResponse } from "next/server";
import { SettingsRepository } from "@/lib/repositories/settings.repo";
import { getSession } from "@/lib/auth/session";
import { can } from "@/lib/auth/rbac";

export async function GET() {
  const settings = await SettingsRepository.getSettings();
  return NextResponse.json({ success: true, data: settings });
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (session && !can(session, "system:manage_settings")) {
      return NextResponse.json({ success: false, error: "FORBIDDEN: Chỉ SUPER_ADMIN có quyền đổi cài đặt" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await SettingsRepository.updateSettings(
      body,
      session ? { id: session.userId, name: session.name } : undefined
    );
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
