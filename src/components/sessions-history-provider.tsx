"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface SessionHistoryContextType {
  version: number;
  idChatActive: string;
  setIdChatActive:(val:string)=>void
  refresh: (id: string) => void;
}

const SessionHistoryContext = createContext<SessionHistoryContextType | undefined>(undefined);

export const SessionHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [version, setVersion] = useState(0);
  const [idChatActive, setIdChatActive] = useState("");

  const refresh = useCallback((id: string) => {
    setVersion((v) => v + 1);
    setIdChatActive(id);
  }, []);

  return (
    <SessionHistoryContext.Provider value={{ version, idChatActive,setIdChatActive, refresh }}>
      {children}
    </SessionHistoryContext.Provider>
  );
};

export const useSessionHistory = () => {
  const context = useContext(SessionHistoryContext);
  if (context === undefined) {
    throw new Error("useSessionHistory must be used within a SessionHistoryProvider");
  }
  return context;
};
