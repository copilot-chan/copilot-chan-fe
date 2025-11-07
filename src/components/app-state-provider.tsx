"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AppStateContextType {
  isFirst: boolean;
  setIsFirst: (val: boolean) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [isFirst, setIsFirst] = useState(true); // mặc định lần đầu

  return (
    <AppStateContext.Provider value={{ isFirst, setIsFirst }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
}
