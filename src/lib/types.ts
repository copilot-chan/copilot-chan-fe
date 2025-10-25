// types/chat.ts
export type Chat = {
  id: string;            // uuid or nanoid
  appName?: string;      // optional, nếu multi-app
  userId: string;
  title?: string;        // có thể auto-generated từ first message
  lastMessage?: string;  // preview
  createdAt: string;     // ISO string, e.g. "2025-10-24T07:36:00.000Z"
  updatedAt?: string;
  // optional: metadata count, unread, pinned...
  messageCount?: number;
  pinned?: boolean;
};
