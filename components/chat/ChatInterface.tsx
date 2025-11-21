"use client";

import { CopilotChat } from "@copilotkit/react-ui";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useMemo } from "react";
import { CustomMessages } from "./CustomMessageComponents";
import { useChatLogic } from "@/hooks/useChatLogic";
import { CopilotActions } from "./actions";

const CHAT_LABELS = {
  title: "Copilot Chan",
  initial: "Hi! How can I help you today?",
};

const CHAT_INSTRUCTIONS = "You are a helpful AI assistant.";

export function ChatInterface({ chatId }: { chatId?: string }) {
  const { isLoading, handleMessageSent, initialMessages, sessionId } = useChatLogic();

  // Wrapper for CustomMessages to merge history
  const MessagesWrapper = useMemo(() => {
    return (props: any) => (
      <CustomMessages {...props} initialMessages={initialMessages} />
    );
  }, [initialMessages]);

  if (isLoading && sessionId) {
     return (
       <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-white">
         <LoadingSpinner text="Loading conversation..." />
       </div>
     );
  }

  return (
    <div className="flex h-screen w-full flex-col bg-zinc-950 text-white">
      <div className="flex-1 overflow-hidden relative">
        <CopilotActions />
        <CopilotChat
          key={sessionId}
          instructions={CHAT_INSTRUCTIONS}
          labels={CHAT_LABELS}
          className="h-full w-full"
          onSubmitMessage={handleMessageSent}
          Messages={MessagesWrapper}
        />
      </div>
    </div>
  );
}
