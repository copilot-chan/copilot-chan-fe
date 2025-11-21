"use client";

import { CopilotKit } from "@copilotkit/react-core";
import { AuthProvider, useAuth } from "@/components/providers/AuthProvider";
import { ChatSessionProvider, useChatSession } from "@/components/providers/ChatSessionProvider";
import "@copilotkit/react-ui/styles.css";

function CopilotKitWrapper({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const { sessionId } = useChatSession();

  return (
    <CopilotKit
      key={sessionId} // Force remount to clear state when switching sessions
      runtimeUrl="/api/copilotkit"
      properties={token ? { authorization: `Bearer ${token}` } : {}}
      agent="chat_agent"
      showDevConsole={(process.env.NODE_ENV === "development" || process.env.IS_DEV === "true")}
      publicLicenseKey={
        process.env.NEXT_PUBLIC_COPILOKIT_LICENSE_KEY ||
        "NEXT_PUBLIC_COPILOKIT_LICENSE_KEY"
      }
      threadId={sessionId}
    >
      {children}
    </CopilotKit>
  );
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChatSessionProvider>
        <CopilotKitWrapper>{children}</CopilotKitWrapper>
      </ChatSessionProvider>
    </AuthProvider>
  );
}
