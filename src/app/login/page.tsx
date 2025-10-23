// src/app/login/page.tsx
"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      // ensure token ready before redirect (improves UX)
      const user = credential.user;
      await user.getIdToken(true); // force fresh token immediately
      router.push("/home");
    } catch (err) {
      console.error("Login failed", err);
      // show friendly toast / UI error
    }
  };

  return (
    <div className="p-6">
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white rounded">
        Đăng nhập với Google
      </button>
    </div>
  );
}
