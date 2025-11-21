import { MessagesProps } from "@copilotkit/react-ui";

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
    <div className="flex flex-col gap-2 copilotKitMessages h-full overflow-y-auto p-4">
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
