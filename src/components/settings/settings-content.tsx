"use client";

import { Dialog } from "radix-ui";
import { AdvancedSettings, MCPServerSettings, MemorySettings } from "./content";
import { SettingsTab, SettingsTabConfig } from "./types";
import { DialogHeader, DialogTitle } from "../ui/dialog";

interface SettingsContentProps {
  activeTab: SettingsTab;
  tabs: SettingsTabConfig[];
}

const CONTENT_COMPONENTS: Record<SettingsTab, React.ComponentType> = {
  memory: MemorySettings,
  mcp: MCPServerSettings,
  advanced: AdvancedSettings,
};

export const SettingsContent: React.FC<SettingsContentProps> = ({
  activeTab,
  tabs,
}) => {
  const ContentComponent = CONTENT_COMPONENTS[activeTab];
  const tabConfig = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="flex flex-col h-full p-6 md:p-8">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl md:text-2xl">
            {tabConfig?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1">
          <ContentComponent />
        </div>
      </div>
    </div>
  );
};
