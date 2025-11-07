import { useState, useCallback } from "react";
import { useAuth } from "@/components/auth-provider";
import type {
  Session,
  ListSessionsResponse,
  ListAppsResponse,
  ChatMessage,
} from "@/lib/types";

/**
 * Hook để quản lý sessions
 */
export function useSessions() {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Lấy danh sách sessions
   */
  const listSessions = useCallback(
    async (appName: string, userId: string): Promise<Session[]> => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ appName, userId });
        const response = await fetch(`/api/sessions/list?${params}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch sessions");
        }

        const data: ListSessionsResponse = await response.json();
        return data.sessions;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Lấy một session cụ thể
   */
  const getSession = useCallback(
    async (
      appName: string,
      userId: string,
      sessionId: string
    ): Promise<ChatMessage[]> => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ appName, userId });
        const response = await fetch(`/api/sessions/${sessionId}?${params}`, {
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(
            "Fetch failed with status:",
            response.status,
            errorData
          );
          throw new Error(errorData.message || "Failed to fetch session");
        }

        const session: Session = await response.json();

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
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /**
   * Lấy danh sách apps
   */
  const listApps = useCallback(async (): Promise<string[]> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/apps", {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch apps");
      }

      const data: ListAppsResponse = await response.json();
      return data.apps;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [token]);

  /**
   * Xóa một session
   */
  const deleteSession = useCallback(
    async (
      appName: string,
      userId: string,
      sessionId: string
    ): Promise<void> => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({ appName, userId });
        const response = await fetch(`/api/sessions/${sessionId}?${params}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to delete session");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  return {
    listSessions,
    getSession,
    listApps,
    deleteSession,
    loading,
    error,
  };
}
