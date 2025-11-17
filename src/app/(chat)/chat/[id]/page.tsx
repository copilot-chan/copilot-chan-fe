import { ChatPageClient } from "./chat-page-client";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  return (
    <>
      <ChatPageClient threadId={id} />
    </>
  );
}
