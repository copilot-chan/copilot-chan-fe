"use client";

import { useEffect, useState } from "react";
import { CopilotKit } from "@copilotkit/react-core";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import "@/app/globals.css"

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (!user) router.push("/login");
      else setToken(await user.getIdToken());
    });
  }, [router]);

  if (!token) return <div>Loading...</div>;

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      properties={
        { authorization: `Bearer ${token}` }
      }
      agent="chat_agent"
      showDevConsole={
        (process.env.IS_DEV || "fasle").toLowerCase() === "true"
      }
    >
      {children}
    </CopilotKit>
  );
}
