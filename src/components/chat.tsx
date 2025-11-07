"use client";

import "@copilotkit/react-ui/styles.css";
import { CopilotChat } from "@copilotkit/react-ui";
import React, { useRef } from "react";
import { ChatHeader } from "@/components/chat-header";
import { CopilotActionRender } from "@/components/copilot-actions";
import { CustomMessages } from "./messages";
import { useRouter } from "next/navigation";
import { useSessionHistory } from "./sessions-history-provider";
import { ChatMessage } from "@/lib/types";
import { useCopilotKitConfig } from "./copilotkit-provider";
import { useAppState } from "./app-state-provider";
interface ChatProps {
  initialMessages: ChatMessage[];
}

export function Chat({ initialMessages }: ChatProps) {
  const router = useRouter();
  const needrefresh = useRef(false);
  const { isFirst, setIsFirst } = useAppState();
  const { refresh } = useSessionHistory();
  const { config } = useCopilotKitConfig();
  const threadId = config?.threadId;
  
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
          if (isFirst) {
            window.history.replaceState({}, "", `/chat/${threadId}`);
            setIsFirst(false);
            needrefresh.current = true;
          }
        }}
        onInProgress={(loading) => {
          console.log("Đang gửi request:", loading, needrefresh.current);
          if (!loading && needrefresh.current) {
            console.log("Server đã trả response xong");
            setTimeout(() => {
              refresh(threadId || "null the del nao dc");
              needrefresh.current = false;
            }, 2000);
          }
        }}
        
        
      />

    </div>
  );
}
