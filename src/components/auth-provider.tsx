// src/components/auth-provider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { onIdTokenChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: User | null;
  uid: string | null;
  token: string | null;
  loading: boolean;
  initializing: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  uid: null,
  token: null,
  loading: true,
  initializing: true,
  error: null,
  signOut: async () => {},
  refreshToken: async () => null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Main auth state listener
  useEffect(() => {
    // onIdTokenChanged fires when user signs in/out and when token is refreshed
    const unsubscribe = onIdTokenChanged(auth, async (u) => {
      try {
        if (!u) {
          setUser(null);
          setToken(null);
          setError(null);
          setLoading(false);
          setInitializing(false);
          return;
        }

        setUser(u);
        // getIdToken() returns current token
        const t = await u.getIdToken();
        setToken(t);
        setError(null);
        setLoading(false);
        setInitializing(false);
      } catch (err) {
        console.error("AuthProvider getIdToken error", err);
        setError(err instanceof Error ? err.message : "Failed to get authentication token");
        // Keep user but clear token on error
        setToken(null);
        setLoading(false);
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Auto refresh token every 50 minutes (before 1 hour expiration)
  useEffect(() => {
    if (!user) return;

    const refreshInterval = setInterval(async () => {
      try {
        const newToken = await user.getIdToken(true); // force refresh
        setToken(newToken);
        setError(null);
        console.log("Token auto-refreshed");
      } catch (err) {
        console.error("Token auto-refresh failed", err);
        setError(err instanceof Error ? err.message : "Token refresh failed");
      }
    }, 50 * 60 * 1000); // 50 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  // Manual token refresh
  const refreshToken = useCallback(async () => {
    if (!user) {
      console.warn("No user to refresh token for");
      return null;
    }

    try {
      const newToken = await user.getIdToken(true);
      setToken(newToken);
      setError(null);
      return newToken;
    } catch (err) {
      console.error("Manual token refresh failed", err);
      setError(err instanceof Error ? err.message : "Token refresh failed");
      return null;
    }
  }, [user]);

  // Sign out handler
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setToken(null);
      setError(null);
      // Redirect after state update
      router.push("/login");
    } catch (err) {
      console.error("Sign out failed", err);
      setError(err instanceof Error ? err.message : "Sign out failed");
    }
  }, [router]);

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        uid: user?.uid ?? null, 
        token, 
        loading, 
        initializing,
        error, 
        signOut,
        refreshToken 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}