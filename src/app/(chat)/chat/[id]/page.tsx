import { fetchSessionMessages } from "@/lib/sessions-server";
import { getUidFromCookie, getTokenFromCookie } from "@/lib/auth-server";
import { notFound } from "next/navigation";
import { CopilotKit } from "@copilotkit/react-core";
import { ChatPageClient } from "./chat-page-client";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const [userId, token] = await Promise.all([
    getUidFromCookie(),
    getTokenFromCookie(),
  ]);
  console.log("userId", userId,token)

  if (!userId || !token) {
    notFound();
  }

  const sessionMessages = await fetchSessionMessages(
    id,
    "copilot-chan",
    userId,
    token
  );
  console.log("[chat/[id]]",sessionMessages);
  return (
    <>

    <ChatPageClient
      threadId={id}
      initialMessages={sessionMessages}
      />
    </>
  );
}
