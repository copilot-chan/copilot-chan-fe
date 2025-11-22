import { useChatSession } from "@/components/providers/ChatSessionProvider";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { LoadingSpinner } from "../../ui/LoadingSpinner";
import { ChatList } from "./ChatList";
import { UserAvatar } from "../../ui/UserAvatar";
import { useSidebar } from "@/components/providers/SidebarProvider";
import { cn } from "@/lib/utils";
import { Menu, PanelLeftClose, PanelLeftOpen, Plus } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import { SettingsToggle } from "../settings/settings-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ChatSidebar() {
  const { generateNewSession } = useChatSession();
  const router = useRouter();
  const {
    isCollapsed,
    isMobileOpen,
    toggleCollapse,
    toggleMobileMenu,
    setMobileMenu,
  } = useSidebar();

  const handleNewChat = () => {
    generateNewSession();
    router.push("/");
    if (window.innerWidth < 768) {
      setMobileMenu(false);
    }
  };

  return (
    <>
      {/* Mobile Menu Trigger - Fixed button when sidebar is closed on mobile */}
      <button
        onClick={toggleMobileMenu}
        className={cn(
          "md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-sidebar-accent text-sidebar-accent-foreground hover:bg-sidebar-accent/80 transition-opacity",
          isMobileOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={cn(
          "flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 ease-in-out",
          // Mobile styles
          "fixed inset-y-0 left-0 z-50 w-64 transform",
          !isMobileOpen && "-translate-x-full md:translate-x-0", // Hide on mobile if closed, always show on desktop (controlled by width below)
          // Desktop styles
          "md:relative md:transform-none",
          isCollapsed ? "md:w-16" : "md:w-64"
        )}
      >
        {/* Header */}
        <div
          className={cn(
            "flex items-center",
            isCollapsed ? "justify-center p-2" : "justify-between p-4"
          )}
        >
          {!isCollapsed && (
            <Label className="text-sidebar-accent-foreground text-lg">
              Copilot-Chan
            </Label>
          )}

          {!isCollapsed && (
            <Button
              onClick={handleNewChat}
              variant={"ghost"}
              className="hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors"
            >
              <Plus className="w-5 h-5" />
            </Button>
          )}

          {/* Collapse Toggle (Desktop only) */}
          <Button
            onClick={toggleCollapse}
            variant={"ghost"}
            className="hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors "
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </Button>

          {/* Close Button (Mobile only) */}
          <button
            onClick={() => setMobileMenu(false)}
            className="md:hidden p-2 rounded hover:bg-sidebar-accent text-sidebar-foreground hover:text-sidebar-accent-foreground transition-colors ml-auto"
          >
            <PanelLeftClose className="w-5 h-5" />
          </button>
        </div>

        {/* New Chat Button (Collapsed State) */}
        {isCollapsed && (
          <div className="p-2 border-b border-sidebar-border flex justify-center">
            <button
              onClick={handleNewChat}
              className="p-2 rounded bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors"
              title="New Chat"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Chat List */}
        <Separator />
        <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent">
          <Suspense
            fallback={
              <div className="flex justify-center p-4">
                <LoadingSpinner text={isCollapsed ? "" : "Loading..."} />
              </div>
            }
          >
            <div className={cn(isCollapsed && "hidden")}>
              <ChatList />
            </div>
          </Suspense>
        </div>

        {/* Footer / User Avatar */}
        <Separator />
        <div className="flex flex-col p-2">
          <SettingsToggle />
          <UserAvatar />
        </div>
      </div>
    </>
  );
}
