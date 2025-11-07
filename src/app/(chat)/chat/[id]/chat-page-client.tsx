"use client";

import {  useEffect, useState } from "react";
import { useCopilotKitConfig } from "@/components/copilotkit-provider";
import { Chat } from "@/components/chat";
import { ChatMessage } from "@/lib/types";
import { useAppState } from "@/components/app-state-provider";
import { useSessionHistory } from "@/components/sessions-history-provider";
import { useAuth } from "@/components/auth-provider";
import { CopilotActionRender } from "@/components/copilot-actions";
import { useSessions } from "@/hooks/use-sessions";

interface ChatPageClientProps {
  threadId: string;
  initialMessages: ChatMessage[];
}

export function ChatPageClient({
  threadId,
  initialMessages,
}: ChatPageClientProps) {
  const { configure, config } = useCopilotKitConfig();
  const { setIsFirst } = useAppState();
  const { setIdChatActive } = useSessionHistory();
  const { token, loading} = useAuth();

  useEffect(() => {
    if (token && threadId) {
      configure({ token, threadId });
      console.log(["[render ChatPageClient]"]);
    }
  }, [token, threadId, configure]);

  useEffect(() => {
    setIdChatActive(threadId);
    setIsFirst(false);
  }, [threadId, setIdChatActive, setIsFirst]);


  if (loading || !token || !config) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <CopilotActionRender />
      <Chat initialMessages={initialMessages} />
    </>
  );
}
