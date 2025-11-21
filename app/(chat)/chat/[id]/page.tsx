"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <div className="flex-1 flex flex-col h-full">
      <ChatInterface chatId={id} />
    </div>
  );
}
