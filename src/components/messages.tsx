
import "@copilotkit/react-ui/styles.css";
import { type MessagesProps } from "@copilotkit/react-ui";
import { motion } from "framer-motion";
import { SparklesIcon } from "./icons";

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
  console.log("[aaaaaaaaaaaa]",inProgress)
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
