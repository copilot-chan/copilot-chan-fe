import { useCopilotAction } from "@copilotkit/react-core";
import { ThinkingMessage } from "../ui/ThinkingMessage";
import { Globe, CheckCircle2 } from "lucide-react";
import { ActionResultCard } from "../ui/ActionResultCard";

export function GoogleSearchAction() {
  useCopilotAction({
    name: "google_search_agent",
    available: "remote",
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
        <ActionResultCard 
          icon={Globe}
          iconColor="text-secondary"
          label="Đã tìm kiếm Google:"
          value={args?.query}
        />
      );
    },
  });

  return null;
}
