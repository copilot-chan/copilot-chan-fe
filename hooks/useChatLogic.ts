import { useChatSession } from "@/components/providers/ChatSessionProvider";
import { usePathname } from "next/navigation";
import { mutate } from "swr";
import useSWR from "swr";
import { useAuth } from "@/components/providers/AuthProvider";
import { fetcher } from "@/lib/api";
import { Chat, Message } from "@/types/api";
import { Message as CopilotMessage, Role, TextMessage } from "@copilotkit/runtime-client-gql";
import { useMemo, useEffect } from "react";
import { useCoAgent } from "@copilotkit/react-core";

export function useChatLogic() {
  const { sessionId } = useChatSession();
  const pathname = usePathname();
  const { user, token } = useAuth();

  // Listen to agent state for title updates
  const { state } = useCoAgent<{ title?: string }>({
    name: "chat_agent",
  });

  // Fetch chat history if sessionId exists and we have a user token
const { data: chatData, isLoading } = useSWR<Chat>(
  sessionId && user && token
    ? [`/api/chats/${sessionId}?userId=${user.uid}`, token]
    : null,
  fetcher,
  {
    shouldRetryOnError: false,
    onError: (err) => {
      if (err.statusCode !== 404) {
        console.error("Error fetching chat history:", err);
      }
    }
  }
);


  const handleMessageSent = async (message: string) => {
    if (pathname === "/" && sessionId) {
      window.history.pushState(null, "", `/chat/${sessionId}`);
    }
    
    setTimeout(() => {
      if (user && token) {
        mutate([`/api/chats?userId=${user.uid}`, token]);
      }
    }, 2000);
  };


  useEffect(() => {
    if (state?.title && user && token) {
      // Debounce or check if needed, but for now just refresh the list
      // to reflect the new title in the sidebar
      mutate([`/api/chats?userId=${user.uid}`, token]);
    }
  }, [state?.title, user, token]);

  // Transform backend messages to Copilot messages
  const initialMessages = useMemo(() => {
    if (!chatData?.events) return [];
    
    return chatData.events.map((msg: Message) => {
      let content = "";
      if (msg.content) {
        content = msg.content.text || "";
        if (!content && msg.content.parts && msg.content.parts.length > 0) {
          content = msg.content.parts.map((p: any) => p.text).join("\n");
        }
      }

      return new TextMessage({
        id: msg.id || crypto.randomUUID(),
        role: msg.author === "user" ? Role.User : Role.Assistant,
        content: content,
        createdAt: msg.timestamp ? new Date(msg.timestamp) : new Date(),
      });
    });
  }, [chatData]);

  return {
    isLoading,
    handleMessageSent,
    initialMessages,
    sessionId
  };
}
