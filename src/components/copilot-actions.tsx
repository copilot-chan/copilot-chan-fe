"use client";
import { ThinkingMessage } from "@/components/messages";
import { CatchAllActionRenderProps, useCopilotAction } from "@copilotkit/react-core";
import React from "react";
import MCPToolCall from "./mcp-tool-call";

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
        <p className="text-gray-500 mt-2">
          📚 Đã hoàn tất tìm kiếm trong trí nhớ.
        </p>
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
        <p className="text-gray-500 mt-2">
          ✅ Đã lưu dữ liệu: <b>{args?.key}</b> →{" "}
          <i>{args?.value || "unknown"}</i>.
        </p>
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
        <p className="text-gray-500 mt-2">✅ Đã hoàn tất tìm kiếm Google.</p>
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
