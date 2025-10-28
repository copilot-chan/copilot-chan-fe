// src/app/login/page.tsx
"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const {signOut}=useAuth()
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = credential.user;

      // Lấy UID và Token từ Firebase user
      const token = await user.getIdToken();

      // Lưu token và uid vào cookie
      document.cookie = `token=${token}; path=/; secure; samesite=lax;`;
      document.cookie = `uid=${user.uid}; path=/; secure; samesite=lax;`;

      // Sau khi lưu, điều hướng về /home
      router.push("/home");
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="p-6">
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Đăng nhập với Google
      </button>
      <Button onClick={signOut}>logout</Button>
    </div>
  );
}
