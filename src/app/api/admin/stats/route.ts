import { NextResponse } from "next/server";
import { StatsRepository } from "@/lib/repositories/stats.repo";

export async function GET() {
  try {
    const stats = await StatsRepository.getAdminKPIs();
    return NextResponse.json({ success: true, data: stats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
