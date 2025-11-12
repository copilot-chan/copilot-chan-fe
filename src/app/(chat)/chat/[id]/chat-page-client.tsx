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
}

export function ChatPageClient({
  threadId,
}: ChatPageClientProps) {
  const { configure, config } = useCopilotKitConfig();
  const { setIsFirst } = useAppState();
  const { setIdChatActive } = useSessionHistory();
  const { token, loading,user} = useAuth();

  const { getSession } = useSessions();
   const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Fetch session messages
  useEffect(() => {
    if (loading || !token || !user?.uid || !threadId) return;
    setFetching(true);
    getSession("copilot-chan", user.uid, threadId)
      .then((msgs) => setMessages(msgs))
      .catch((err) => {
        console.error("Error fetching session:", err);
        setError(err.message);
      })
      .finally(() => setFetching(false));
  }, [loading, token, user, threadId, getSession]);



  if (loading || !token || !config) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading session: {error}</div>;
  }


  return (
    <>
      <CopilotActionRender />
      <Chat initialMessages={messages} />
    </>
  );
}
