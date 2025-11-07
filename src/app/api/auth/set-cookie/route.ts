import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("[DEBUGGGGGGGGGGGGGGGG]Set-Cookie called at");
  try {
    const { token } = await req.json();
    if (!token) return NextResponse.json({ error: "No token" }, { status: 400 });

    const res = NextResponse.json({ ok: true });
    res.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1h
    });
    return res;
  } catch (err) {
    console.error("set-cookie error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE() {
  console.log("[DEBUGGGGGGGGGGGGGGGG]Set-Cookie called at delete");
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
