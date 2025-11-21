"use client";

import useSWR, { mutate } from "swr";
import { useAuth } from "@/components/providers/AuthProvider";
import { ChatItem } from "./ChatItem";
import { Chat } from "@/types/api";
import { fetcher } from "@/lib/api";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function ChatList() {
  const { user, token } = useAuth();

  const { data: sessions } = useSWR<Chat[]>(
    user && token ? [`/api/chats?userId=${user.uid}`, token] : null,
    ([url, token]: [string, string]) => fetcher(url, token),
    { 
      suspense: true,
      fallbackData: [], // Optional: provide initial data if needed
      revalidateOnFocus: false
    }
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this chat?")) return;
    
    try {
      // Optimistic update: remove item immediately
      mutate(
        [`/api/chats?userId=${user?.uid}`, token],
        (currentData: Chat[] | undefined) => currentData?.filter(chat => chat.id !== id),
        false
      );

      const res = await fetch(`/api/chats/${id}?userId=${user?.uid}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete chat");
      }

      // Revalidate to ensure sync
      mutate([`/api/chats?userId=${user?.uid}`, token]);
      
      // If we deleted the current chat, redirect to new chat
      if (window.location.pathname === `/chat/${id}`) {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Failed to delete chat. Please try again.");
      // Revert optimistic update
      mutate([`/api/chats?userId=${user?.uid}`, token]);
    }
  };

  if (!sessions || sessions.length === 0) {
    return <div className="p-4 text-zinc-500 text-sm text-center">No chats yet</div>;
  }

  return (
    <div className="space-y-1">
      {sessions.map((session) => (
        <ChatItem key={session.id} chat={session} onDelete={handleDelete} />
      ))}
    </div>
  );
}
