"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CopilotKit } from "@copilotkit/react-core";
import { useAuth } from "@/components/auth-provider";

export default function HomeClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !token) return <div>Loading...</div>;

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      properties={{ authorization: `Bearer ${token}` }}
      agent="chat_agent"
      showDevConsole={(process.env.IS_DEV || "false").toLowerCase() === "true"}
    >
      {children}
    </CopilotKit>
  );
}
