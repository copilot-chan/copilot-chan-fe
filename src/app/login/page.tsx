// src/app/login/page.tsx
"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { Button } from "@/components/ui/button";
import { GoogleLoginButton } from "@/components/google-login-button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {error}=useAuth()

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = credential.user;

      const token = await user.getIdToken();
      document.cookie = `token=${token}; path=/; secure; samesite=lax;`;
      document.cookie = `uid=${user.uid}; path=/; secure; samesite=lax;`;

      router.push("/");
    } catch (err) {
      console.error("Login failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 w-full">
      <div className="w-full max-w-md">
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <div className="mb-8 space-y-2">

            <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
            <GoogleLoginButton
              onSignIn={handleGoogleLogin}
              isLoading={isLoading}
            />
            {error && <div className="mb-6 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
