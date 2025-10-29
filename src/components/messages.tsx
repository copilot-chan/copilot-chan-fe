
import "@copilotkit/react-ui/styles.css";

// Component render tin nhắn người dùng
const UserMessage = ({ content }: { content: string }) => (
  <div className="flex justify-end mb-2">
    <div className="bg-blue-600 text-white p-3 rounded-2xl max-w-[70%]">
      {content}
    </div>
  </div>
);

// Component render tin nhắn từ assistant
const AssistantMessage = ({ content }: { content: string }) => (
  <div className="flex justify-start mb-2">
    <div className="bg-gray-200 text-black p-3 rounded-2xl max-w-[70%]">
      {content}
    </div>
  </div>
);
// Component render danh sách message
export function Messages({ messages }: { messages: any[] }) {
  return (
    <div className="flex flex-col gap-2">
      {messages.map((msg) =>
        msg.role === "user" ? (
          <UserMessage key={msg.id} content={msg.content} />
        ) : (
          <AssistantMessage key={msg.id} content={msg.content} />
        )
      )}
    </div>
  );
}


import { type UserMessageProps } from "@copilotkit/react-ui";
const CustomUserMessage = (props: UserMessageProps) => {
  const wrapperStyles = "flex items-center gap-2 justify-end mb-4";
  const messageStyles = "bg-blue-500 text-white py-2 px-4 rounded-xl break-words flex-shrink-0 max-w-[80%]";
  const avatarStyles = "bg-blue-500 shadow-sm min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";
  return (
    <div className={wrapperStyles}>
      <div className={messageStyles}>{props.message?.content}</div>
      <div className={avatarStyles}>TS</div>
    </div>
  );
};


import { type AssistantMessageProps } from "@copilotkit/react-ui";
import { useChatContext } from "@copilotkit/react-ui";
import { Markdown } from "@copilotkit/react-ui";
import { SparklesIcon } from "@heroicons/react/24/outline";
const CustomAssistantMessage = (props: AssistantMessageProps) => {
  const { icons } = useChatContext();
  const { message, isLoading, subComponent } = props;
  const avatarStyles = "bg-zinc-400 border-zinc-500 shadow-lg min-h-10 min-w-10 rounded-full text-white flex items-center justify-center";
  const messageStyles = "px-4 rounded-xl pt-2";
  const avatar = <div className={avatarStyles}><SparklesIcon className="h-6 w-6" /></div>
  return (
    <div className="py-2">
      <div className="flex items-start">
        {!subComponent && avatar}
        <div className={messageStyles}>
          {message && <Markdown content={message.content || ""} /> }
          {isLoading && icons.spinnerIcon}
        </div>
      </div>
      <div className="my-2">{subComponent}</div>
    </div>
  );
};


import { type MessagesProps } from "@copilotkit/react-ui";

interface CustomMessagesProps extends MessagesProps {
  initialMessages?: any[];
}

export function CustomMessages({
  messages,
  inProgress,
  RenderMessage,
  initialMessages = [],
}: CustomMessagesProps) {


  // Gộp message cũ và mới
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
