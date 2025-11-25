"use client";
import { ThinkingMessage } from "@/components/chat/actions/ui/ThinkingMessage";
import {
  CatchAllActionRenderProps,
  useCopilotAction,
} from "@copilotkit/react-core";
import React from "react";
import MCPToolCall from "./mcp-tool-call";
import { CheckCircle2, Database, Search } from "lucide-react";

export function CopilotActionRender() {
  // --- search_memory ---
  useCopilotAction({
    name: "search_memory",
    available: "frontend",
    render: ({ status, args }) => {
      if (status !== "complete") {
        return (
          <ThinkingMessage
            thinkingMessage={`🔍 Đang tìm trong trí nhớ với từ khóa: ${
              args?.query || "..."
            }`}
          />
        );
      }
      return (
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-transparent">
          <Database className="w-4 h-4 text-primary" />
          <span>📚 Đã hoàn tất tìm kiếm trong trí nhớ.</span>
        </div>
      );
    },
  });

  // --- save_memory ---
  useCopilotAction({
    name: "save_memory",
    available: "frontend",
    render: ({ status, args }) => {
      if (status !== "complete") {
        return (
          <ThinkingMessage
            thinkingMessage={`💾 Đang lưu vào bộ nhớ: ${
              args?.key || "unknown"
            }...`}
          />
        );
      }
      return (
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-transparent">
          <CheckCircle2 className="w-4 h-4 text-green-500" />
          <span>
            ✅ Đã lưu dữ liệu:{" "}
            <span className="font-medium text-foreground">{args?.key}</span>
          </span>
        </div>
      );
    },
  });

  // --- google_search_agent ---
  useCopilotAction({
    name: "google_search_agent",
    available: "frontend",
    render: ({ status, args }) => {
      if (status !== "complete") {
        return (
          <ThinkingMessage
            thinkingMessage={`🌐 Đang tìm kiếm Google cho: ${
              args?.query || "..."
            }`}
          />
        );
      }
      return (
        <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-transparent">
          <Search className="w-4 h-4 text-blue-500" />
          <span>✅ Đã hoàn tất tìm kiếm Google.</span>
        </div>
      );
    },
  });

  useCopilotAction({
    /**
     * The asterisk (*) matches all tool calls
     */
    name: "*",
    render: ({ name, status, args, result }: CatchAllActionRenderProps<[]>) => (
      <MCPToolCall status={status} name={name} args={args} result={result} />
    ),
  });
  return null;
}
