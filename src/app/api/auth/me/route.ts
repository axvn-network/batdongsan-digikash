import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { UserRepository } from "@/lib/repositories/user.repo";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ user: null });
  }

  const user = await UserRepository.findById(session.userId);
  return NextResponse.json({ user });
}
