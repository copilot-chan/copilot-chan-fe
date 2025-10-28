// app/api/auth/set-cookie/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });

  const res = NextResponse.json({ ok: true });
  // Cookie tồn tại 1 giờ, HttpOnly, secure (chỉ server mới đọc được)
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60, // 1 giờ
  });

  return res;
}
