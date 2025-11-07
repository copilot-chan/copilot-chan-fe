// "use client";

// import "@copilotkit/react-ui/styles.css";
// import { CopilotChat } from "@copilotkit/react-ui";
// import React, { useEffect, useState } from "react";
// import { ChatHeader } from "@/components/chat-header";
// import { useSessions } from "@/hooks/use-sessions";
// import { useRouter } from "next/router";
// import { CopilotKit } from "@copilotkit/react-core";
// import { Chat } from "./chat";

// interface ChatMessage {
//   id: string;
//   role: string;
//   content: string;
// }

// interface AppProps {
//   token:string;
//   initialMessages: ChatMessage[];
//   threadId:string
//   isFirst:boolean
// }



// export function MyApp({ token,threadId, initialMessages,isFirst }: AppProps) {
//   return (
//     <CopilotKit
//       runtimeUrl="/api/copilotkit"
//       properties={{ authorization: `Bearer ${token}` }}
//       agent="chat_agent"
//       showDevConsole={(process.env.IS_DEV || "true").toLowerCase() === "true"}
//       publicLicenseKey={
//         process.env.NEXT_PUBLIC_COPILOKIT_LICENSE_KEY ||
//         "NEXT_PUBLIC_COPILOKIT_LICENSE_KEY"
//       }
//       threadId={threadId}
//     >
     
//     </CopilotKit>
//   );
// }
