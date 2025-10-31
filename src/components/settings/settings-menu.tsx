"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { SettingsTab, SettingsTabConfig } from "./types";

interface SettingsMenuProps {
  tabs: SettingsTabConfig[];
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}

export const SettingsMenu:React.FC<SettingsMenuProps>=({
  tabs,
  activeTab,
  onTabChange,
}) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarMenu>
        {tabs.map((tab) => (
          <SidebarMenuItem key={tab.id}>
            <SidebarMenuButton
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
              className="cursor-pointer"
              title={tab.label}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
