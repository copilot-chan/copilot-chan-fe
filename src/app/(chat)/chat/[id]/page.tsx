import { fetchSessionMessages } from "@/lib/sessions-server";
import { getUidFromCookie, getTokenFromCookie } from "@/lib/auth-server";
import { notFound } from "next/navigation";
import { CopilotKit } from "@copilotkit/react-core";
import { MyApp } from "@/components/my-app";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const [userId, token] = await Promise.all([
    getUidFromCookie(),
    getTokenFromCookie(),
  ]);
  console.log("userId", userId)

  if (!userId || !token) {
    notFound();
  }
  


  const sessionMessages = await fetchSessionMessages(
    id,
    "copilot-chan",
    userId,
    token
  );
  console.log(sessionMessages);
  return (
    <MyApp
      token={token}
      threadId={id}
      initialMessages={sessionMessages}
      isFirst={false}
    ></MyApp>
  );
}
