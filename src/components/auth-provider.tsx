// src/components/AuthProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { onIdTokenChanged, signOut as firebaseSignOut,User } from "firebase/auth";
import { auth } from "@/lib/firebase";

type AuthContextType = {
  user: User | null;
  uid: string | null;
  token: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  uid:null,
  token: null,
  loading: true,
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // onIdTokenChanged fires when user signs in/out and when token is refreshed
    const unsubscribe = onIdTokenChanged(auth, async (u) => {
      try {
        if (!u) {
          setUser(null);
          setToken(null);
          setLoading(false);
          return;
        }
        setUser(u);
        // getIdToken() returns current token; pass true to force refresh if you need
        const t = await u.getIdToken();
        setToken(t);
        setLoading(false);
      } catch (err) {
        console.error("AuthProvider getIdToken error", err);
        setError("Auth error");
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // only force-refresh on demand (e.g., when updating custom claims).
  const signOut = useCallback(async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setToken(null);
    } catch (err) {
      console.error("Sign out failed", err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user,uid:user?.uid??null, token, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
