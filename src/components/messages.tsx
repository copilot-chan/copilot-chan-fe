
import "@copilotkit/react-ui/styles.css";
import { ErrorMessageProps, type MessagesProps } from "@copilotkit/react-ui";
import { motion } from "framer-motion";
import { SparklesIcon, WarningIcon } from "./icons";
import { RedoIcon, X } from "lucide-react";

interface ThinkingMessageProps {
  thinkingMessage: string;
}

export const ThinkingMessage = ({ thinkingMessage }: ThinkingMessageProps) => {
  const role = "assistant";

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="group/message w-full"
      data-role={role}
      data-testid="message-assistant-loading"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-start gap-3">
        <div className="-mt-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-border">
          <SparklesIcon size={14} />
        </div>

        <div className="flex w-full flex-col gap-2 md:gap-4">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="p-0 text-muted-foreground text-sm"
          >
            {thinkingMessage || "Thinking..."}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
interface CustomMessagesProps extends MessagesProps {
  initialMessages?: any[];
}

export function CustomMessages({
  messages,
  inProgress,
  RenderMessage,
  initialMessages = [],
}: CustomMessagesProps) {

  const allMessages = [...initialMessages, ...messages];
  return (
    <div className="flex flex-col gap-2 copilotKitMessages h-full overflow-y-auto">
      {allMessages.map((message, index) => {
        const isCurrentMessage = index === allMessages.length - 1;
        return (
          <RenderMessage
            key={index}
            message={message}
            inProgress={inProgress}
            index={index}
            isCurrentMessage={isCurrentMessage}
          />
        );
      })}
    </div>
  );
}


export function CustomErrorMessages(error: {
  message: string;
  operation?: string;
  timestamp: number;
  onDismiss: () => void;
  onRetry?: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-start gap-3 p-4 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive relative"
    >
      {/* Icon */}
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-destructive/20">
        <WarningIcon size={18} />
      </div>

      {/* Nội dung lỗi */}
      <div className="flex flex-col flex-1">
        <p className="font-semibold text-sm">{error.message}</p>
        {error.operation && (
          <p className="text-xs opacity-70">
            Operation: <code>{error.operation}</code>
          </p>
        )}
        <p className="text-xs opacity-50 mt-1">
          {new Date(error.timestamp).toLocaleString()}
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {error.onRetry && (
          <button
            onClick={error.onRetry}
            className="text-destructive hover:text-destructive/80 transition"
            title="Retry"
          >
            <RedoIcon size={16} />
          </button>
        )}
        <button
          onClick={error.onDismiss}
          className="text-destructive hover:text-destructive/80 transition"
          title="Dismiss"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
