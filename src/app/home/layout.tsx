"use client";

import { useEffect } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { useRouter } from "next/navigation";
import "@/app/globals.css";
import { useAuth } from "@/components/auth-provider";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {token, loading,user} = useAuth();
  const router=useRouter();
  
  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

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
