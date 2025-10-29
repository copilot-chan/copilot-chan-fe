// lib/sessions-server.ts
import type { Session } from "@/lib/types";

type ChatMessage = {
  id: string;
  role: string;
  content: string;
};

export async function fetchSessionMessages(
  sessionId: string,
  appName: string,
  userId: string,
  token?: string
): Promise<ChatMessage[]> {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";

  const params = new URLSearchParams({ appName, userId });
  const res = await fetch(
    `${BACKEND_URL}/apps/${appName}/users/${userId}/sessions/${sessionId}?${params}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    }
  );

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`Failed to fetch session: ${res.statusText} - ${msg}`);
  }

  const session: Session = await res.json();

  // Convert session events → ChatMessage[]
  const messages =
    session?.events
      ?.filter(
        (event) =>
          event.content &&
          Array.isArray(event.content.parts) &&
          event.content.parts.length > 0
      )
      .map((event, index) => {
        const textParts = event.content.parts
          .map((p: any) => p.text)
          .filter(Boolean)
          .join(" ");

        const role =
          event.author === "copilot_chat" ? "assistant" : event.author;

        return {
          id: String(index + 1),
          role: role as "user" | "assistant",
          content: textParts,
        };
      }) ?? [];

  return messages;
}

