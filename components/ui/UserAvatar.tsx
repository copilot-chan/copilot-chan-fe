"use client";

import { useAuth } from "@/components/providers/AuthProvider";

export function UserAvatar() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="p-4 border-t border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs text-white">
          {user.email?.[0]?.toUpperCase() || "U"}
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-medium truncate text-white">
            {user.email || "User"}
          </p>
        </div>
      </div>
    </div>
  );
}
