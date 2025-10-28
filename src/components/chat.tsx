"use client";

import "@copilotkit/react-ui/styles.css";
import { CopilotChat } from "@copilotkit/react-ui";
import React, { useRef } from "react";
import { ChatHeader } from "@/components/chat-header";
import { CopilotActionRender } from "@/components/copilot-actions";
import { CustomMessages, Messages } from "./messages";

interface ChatMessage {
  id: string;
  role: string;
  content: string;
}


interface ChatProps {
  initialMessages: ChatMessage[];
  threadId: string;
  isFirst: boolean;
}

export function Chat({ initialMessages, threadId, isFirst }: ChatProps) {
  const needredirect = useRef(false);
  needredirect.current = isFirst;

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader chatId={"id"} />
      <CopilotChat
        className="flex-1 h-full overflow-y-auto p-4"
        labels={{
          title: "Copilot-chan",
          initial: "Hi! I'm connected to an agent. How can I help?",
        }}
        Messages={(props) => (
          <CustomMessages {...props} initialMessages={initialMessages} />
        )}
        onSubmitMessage={async (msg) => {
          if (needredirect.current) {
            window.history.replaceState({}, "", `/chat/${threadId}`);
            alert("Hello! Đây là thông báo đơn giản nhất 😄");
            needredirect.current = false;
          }
        }}
      />
      <CopilotActionRender />
    </div>
  );
}
