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
import { Loader } from "@/components/ui/loader";
import { ThinkingMessage } from "@/components/message";

export default function HomePage() {
  useCopilotAction({
    name: "search_memory",
    available: "frontend",
    render: ({ status, args }) => {
      if (status !== "complete") {
        return (
          <ThinkingMessage
            thinkingMessage={`🔍 Đang tìm trong trí nhớ với từ khóa: ${args?.query || "..."}`}
          />
        );
      }
      return <p className="text-gray-500 mt-2">📚 Đã hoàn tất tìm kiếm trong trí nhớ.</p>;
    },
  });

  // --- TOOL 2: save_memory ---
  useCopilotAction({
    name: "save_memory",
    available: "frontend",
    render: ({ status, args }) => {
      if (status !== "complete") {
        return (
          <ThinkingMessage
            thinkingMessage={`💾 Đang lưu vào bộ nhớ: ${args?.key || "unknown"}...`}
          />
        );
      }
      return (
        <p className="text-gray-500 mt-2">
          ✅ Đã lưu dữ liệu: <b>{args?.key}</b> → <i>{args?.value||"unknown"}</i>.
        </p>
      );
    },
  });

  // --- TOOL 3: google_search_agent ---
  useCopilotAction({
    name: "google_search_agent",
    available: "frontend",
    render: ({ status, args }) => {
      if (status !== "complete") {
        return (
          <ThinkingMessage
            thinkingMessage={`🌐 Đang tìm kiếm Google cho: ${args?.query || "..."}`}
          />
        );
      }
      return <p className="text-gray-500 mt-2">✅ Đã hoàn tất tìm kiếm Google.</p>;
    },
  });

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader chatId={"id"} />
      <CopilotChat
        labels={{
          title: "Copilot-chan",
          initial: "Hi! I'm connected to an agent. How can I help?",
        }}
        className="flex-1 h-full"
      />
    </div>
  );
}
