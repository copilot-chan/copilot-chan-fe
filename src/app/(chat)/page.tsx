"use client";

import "@copilotkit/react-ui/styles.css";
import {
  useCoAgent,
  useCopilotAction,
  useCoAgentStateRender,
  useCopilotAdditionalInstructions,
  CopilotKit,
} from "@copilotkit/react-core";
import {
  CopilotKitCSSProperties,
  CopilotChat,
  CopilotPopup,
} from "@copilotkit/react-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "@/components/chat-header";
import { X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { ThinkingMessage } from "@/components/messages";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { generateTimeUID } from "@/lib/utils";
import { Chat } from "@/components/chat";
import { useCopilotKitConfig } from "@/components/copilotkit-provider";
import { useAppState } from "@/components/app-state-provider";
import { CopilotActionRender } from "@/components/copilot-actions";

export default function HomePage() {
  const { token, loading, user } = useAuth();
  const router = useRouter();
  const { configure, config } = useCopilotKitConfig();
  const { setIsFirst } = useAppState();
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (token && !config) {
      const newThreadId = generateTimeUID();
      setThreadId(newThreadId);
      configure({ token, threadId: newThreadId });
    }

    setIsFirst(true);
  }, [loading, user, router, token, configure, config]);

  if (loading || !token || !config) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CopilotActionRender />
      <Chat initialMessages={[]} />
    </>
  );
}
