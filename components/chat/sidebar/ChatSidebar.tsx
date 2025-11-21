import { useChatSession } from "@/components/providers/ChatSessionProvider";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { ChatList } from "./ChatList";
import { UserAvatar } from "../../ui/UserAvatar";


export function ChatSidebar() {
  const { generateNewSession } = useChatSession();
  const router = useRouter();

  const handleNewChat = () => {
    generateNewSession();
    router.push("/");
  };

  return (
    <div className="w-64 border-r border-zinc-800 bg-zinc-900 flex flex-col">
      <div className="p-4 border-b border-zinc-800">
        <button
          onClick={handleNewChat}
          className="flex items-center justify-center w-full px-4 py-2 rounded bg-white text-black font-medium hover:bg-zinc-200 transition-colors"
        >
          + New Chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2">
        <Suspense  fallback={<LoadingSpinner text="Loading chats..." />}>
          <ChatList  />
        </Suspense>
      </div>

      <UserAvatar />
    </div>
  );
}
