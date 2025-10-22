import "@copilotkit/react-ui/styles.css";
import { CopilotChat } from "@copilotkit/react-ui";

export default function HomePage() {
  return (
    <CopilotChat
      labels={{
        title: "Copilot-chan",
        initial: "Hi! I'm connected to an agent. How can I help?",
      }}
    />
  );
}
