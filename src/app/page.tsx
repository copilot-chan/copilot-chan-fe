import "@copilotkit/react-ui/styles.css";
import { CopilotChat } from "@copilotkit/react-ui";

export default function Home() {
  return (
    <main>
        <CopilotChat
            labels={{
                title: "Popup Assistant",
                initial: "Hi! I'm connected to an agent. How can I help?",
            }}
        />
    </main>
  );
}
