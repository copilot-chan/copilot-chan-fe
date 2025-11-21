import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatInterface } from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ChatInterface />
    </main>
  );
}
