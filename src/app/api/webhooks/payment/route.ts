import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("[Webhook Payment Received]", body);
  return NextResponse.json({ success: true, message: "Webhook processed" });
}
