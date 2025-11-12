"use client";

import { CopilotKit } from "@copilotkit/react-core";
import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useCallback,
  useRef,
} from "react";

type CopilotConfig = {
  token: string;
  threadId: string;
};

interface CopilotKitContextType {
  config: CopilotConfig | null;
  configure: (newConfig: CopilotConfig) => void;
  reset: () => void;
}

const CopilotKitContext = createContext<CopilotKitContextType | undefined>(
  undefined
);

export const CopilotKitProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<CopilotConfig | null>(null);
  const configRef = useRef<CopilotConfig | null>(null);

  const configure = useCallback((newConfig: CopilotConfig) => {
    if (
      !configRef.current ||
      configRef.current.token !== newConfig.token ||
      configRef.current.threadId !== newConfig.threadId
    ) {
      console.log("CopilotKitContext: Configuring with", newConfig);
      configRef.current = newConfig;
      setConfig(newConfig);
    }
  }, []);

  const reset = useCallback(() => {
    setConfig(null);
    console.log("CopilotKitProvider reset");
  }, []);

  if (config) {
    return (
      <CopilotKitContext.Provider value={{ config, configure, reset }}>
        <CopilotKit
          runtimeUrl="/api/copilotkit"
          properties={{ authorization: `Bearer ${config.token}` }}
          agent="chat_agent"
          showDevConsole={
            (process.env.IS_DEV || "true").toLowerCase() === "true"
          }
          publicLicenseKey={
            process.env.NEXT_PUBLIC_COPILOKIT_LICENSE_KEY ||
            "NEXT_PUBLIC_COPILOKIT_LICENSE_KEY"
          }
          threadId={config.threadId}
        >
          {children}
        </CopilotKit>
      </CopilotKitContext.Provider>
    );
  }

  return (
    <CopilotKitContext.Provider value={{ config, configure, reset }}>
      {children}
    </CopilotKitContext.Provider>
  );
};

export const useCopilotKitConfig = () => {
  const context = useContext(CopilotKitContext);
  if (!context) {
    throw new Error(
      "useCopilotKitConfig must be used within a CopilotKitProvider"
    );
  }
  return context;
};
