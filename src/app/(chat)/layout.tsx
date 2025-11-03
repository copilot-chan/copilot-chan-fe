import { AppSidebar } from "@/components/app-sidebar";
import { Settings } from "@/components/settings";
import { SidebarInset } from "@/components/ui/sidebar";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AppSidebar />
      <Settings />
      <SidebarInset>{children}</SidebarInset>
    </>
  )
}
