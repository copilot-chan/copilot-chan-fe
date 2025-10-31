"use client";

import { Dialog, DialogContent } from "../ui/dialog";
import { SettingsMenu } from "./settings-menu";
import { SettingsContent } from "./settings-content";
import { useSettings } from "./settings-provider";
import { SETTINGS_TABS } from "./types";

const SIDEBAR_WIDTH = "w-56";
const DIALOG_WIDTH = "w-full max-w-[50vw] md:max-w-2xl lg:max-w-3xl xl:max-w-4xl";

export function Settings() {
  const { open, setOpen, activeTab, setActiveTab } = useSettings();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        side="custom"
        className={`${DIALOG_WIDTH} inset-y-0 right-0 h-full border-l flex flex-col md:flex-row p-0 overflow-hidden`}
        aria-label="Settings"
      >
        <aside
          className={`${SIDEBAR_WIDTH} border-r border-border bg-sidebar flex-shrink-0 overflow-y-auto hidden md:flex flex-col`}
          role="complementary"
          aria-label="Settings navigation"
        >
          <SettingsMenu
            tabs={SETTINGS_TABS}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </aside>

        <SettingsContent activeTab={activeTab} tabs={SETTINGS_TABS} />
      </DialogContent>
    </Dialog>
  );
}
