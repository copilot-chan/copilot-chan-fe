"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const handleLogin = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
    window.location.href = "/home";
  };

  return <button onClick={handleLogin}>Đăng nhập với Google</button>;
}
