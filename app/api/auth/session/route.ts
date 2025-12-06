import { NextRequest, NextResponse } from "next/server";
import { getSessionFromCookie } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const session = await getSessionFromCookie(request.headers.get("cookie"));

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: { id: session.userId },
  });
}




