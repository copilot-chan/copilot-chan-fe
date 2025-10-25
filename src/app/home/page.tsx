"use client";

import "@copilotkit/react-ui/styles.css";
import {
  useCoAgent,
  useCopilotAction,
  useCoAgentStateRender,
  useCopilotAdditionalInstructions,
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


export default function HomePage() {
  return (
    <div className="h-full flex flex-col ">
      <ChatHeader chatId={"id"} />
      <CopilotChat
        labels={{
          title: "Copilot-chan",
          initial: "Hi! I'm connected to an agent. How can I help?",
        }}
        className="flex-1"
      />
    </div>
  );
}
