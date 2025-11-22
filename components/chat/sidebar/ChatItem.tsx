"use client";

import Link from "next/link";
import { Chat } from "@/types/api";
import { usePathname } from "next/navigation";

interface ChatItemProps {
  chat: Chat;
  onDelete?: (id: string) => void;
}

export function ChatItem({ chat, onDelete }: ChatItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/chat/${chat.id}`;
  
  // Determine display title: use state.title, or appName + id
  const displayTitle = chat.state?.title || chat.appName || `Chat ${chat.id.slice(0, 4)}`;

  return (
    <div className="group relative flex items-center">
      <Link
        href={`/chat/${chat.id}`}
        className={`flex-1 block px-3 py-2 rounded text-sm transition-colors truncate ${
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        }`}
        title={displayTitle}
      >
        {displayTitle}
      </Link>
      {onDelete && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(chat.id);
          }}
          className="absolute right-2 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity px-1"
          title="Delete Chat"
        >
          ×
        </button>
      )}
    </div>
  );
}
