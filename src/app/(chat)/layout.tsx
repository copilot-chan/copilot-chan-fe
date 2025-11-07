import { AppSidebar } from "@/components/app-sidebar";
import { CopilotKitProvider } from "@/components/copilotkit-provider";
import { SessionHistoryProvider } from "@/components/sessions-history-provider";
import { Settings } from "@/components/settings";
import { SettingsProvier } from "@/components/settings/settings-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const cookieStore = await cookies();
  const isCollapsed = cookieStore.get("sidebar_state")?.value !== "true";

  return (
    <>
      <SessionHistoryProvider>
        <SidebarProvider defaultOpen={!isCollapsed}>
          <SettingsProvier>
            <AppSidebar />
            <Settings />
            <SidebarInset>{children}</SidebarInset>
          </SettingsProvier>
        </SidebarProvider>
      </SessionHistoryProvider>
    </>
  );
}
