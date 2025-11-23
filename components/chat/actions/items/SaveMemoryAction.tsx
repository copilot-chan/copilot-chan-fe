import { useCopilotAction } from "@copilotkit/react-core";
import { ThinkingMessage } from "../ui/ThinkingMessage";
import { Save, CheckCircle2 } from "lucide-react";
import { ActionResultCard } from "../ui/ActionResultCard";

export function SaveMemoryAction() {
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
        <ActionResultCard
          icon={CheckCircle2}
          label="Đã ghi nhớ:"
          value={args?.key}
        />
      );
    },
  });

  return null;
}
