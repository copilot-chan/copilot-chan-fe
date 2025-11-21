import { Loader2 } from "lucide-react";

interface ThinkingMessageProps {
  thinkingMessage: string;
}

export function ThinkingMessage({ thinkingMessage }: ThinkingMessageProps) {
  return (
    <div className="flex items-center gap-2 text-zinc-500 italic text-sm mt-2">
      <Loader2 className="w-4 h-4 animate-spin" />
      <span>{thinkingMessage}</span>
    </div>
  );
}
