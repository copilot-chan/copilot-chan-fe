import { useCopilotAction } from "@copilotkit/react-core";
import { ThinkingMessage } from "../ui/ThinkingMessage";
import { Search, CheckCircle2 } from "lucide-react";
import { ActionResultCard } from "../ui/ActionResultCard";

export function SearchMemoryAction() {
  useCopilotAction({
    name: "search_memory",
    available: "remote",
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
        <ActionResultCard 
          icon={CheckCircle2}
          iconColor="text-green-500"
          label="Đã tìm thấy thông tin liên quan đến:"
          value={args?.query}
        />
      );
    },
  });

  return null;
}
