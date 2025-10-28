// src/lib/auth-server.ts
import { cookies } from "next/headers";

/**
 * Lấy UID của user từ cookie.
 * Dùng cho Server Components hoặc Route Handlers.
 */
export async function getUidFromCookie(): Promise<string | null> {
  const cookieStore = await cookies(); // không cần await, nhưng thêm cũng không sao
  const uid = cookieStore.get("uid")?.value;
  return uid ?? null;
}

/**
 * Lấy Firebase ID Token từ cookie.
 * Dùng khi cần xác thực request đến backend.
 */
export async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore =await cookies();
  const token = cookieStore.get("token")?.value;
  return token ?? null;
}
