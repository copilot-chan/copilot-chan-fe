"use client";

import "@copilotkit/react-ui/styles.css";
import {
  useCoAgent,
  useCopilotAction,
  useCoAgentStateRender,
  useCopilotAdditionalInstructions,
  CopilotKit,
} from "@copilotkit/react-core";
import {
  CopilotKitCSSProperties,
  CopilotChat,
  CopilotPopup,
} from "@copilotkit/react-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChatHeader } from "@/components/chat-header";
import { X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/ui/loader";
import { ThinkingMessage } from "@/components/message";
import { MyApp } from "@/components/my-app";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import {generateTimeUID}from "@/lib/utils"


export default function HomePage() {
  const { token, loading, user } = useAuth();
  const router = useRouter();
  const id = generateTimeUID();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user, router]);

  if (loading || !token) return <div>Loading...</div>;

  return (
    <MyApp
      token={token}
      initialMessages={[]}
      threadId={id}
      isFirst={true}
    ></MyApp>
  );
}
