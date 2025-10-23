"use client";

import "@copilotkit/react-ui/styles.css";
import { useCoAgent, useCopilotAction, useCoAgentStateRender, useCopilotAdditionalInstructions } from "@copilotkit/react-core";
import { CopilotKitCSSProperties, CopilotChat, CopilotPopup } from "@copilotkit/react-ui";
import { useCallback, useEffect, useRef, useState } from "react";
import type React from "react";
// import { Button } from "@/components/ui/button"
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import AppChatHeader, { PopupHeader } from "@/components/canvas/AppChatHeader";
// import { X, Check, Loader2 } from "lucide-react"
// import ShikiHighlighter from "react-shiki/web";
// import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
// import { EmptyState } from "@/components/empty-state";
// import { cn } from "@/lib/utils";
// import type { AgentState, PlanStep, Item, ItemData, ProjectData, EntityData, NoteData, ChartData, CardType } from "@/lib/canvas/types";
// import { initialState, isNonEmptyAgentState } from "@/lib/canvas/state";
// import { projectAddField4Item, projectSetField4ItemText, projectSetField4ItemDone, projectRemoveField4Item, chartAddField1Metric, chartSetField1Label, chartSetField1Value, chartRemoveField1Metric } from "@/lib/canvas/updates";
// import useMediaQuery from "@/hooks/use-media-query";
// import ItemHeader from "@/components/canvas/ItemHeader";
// import NewItemMenu from "@/components/canvas/NewItemMenu";
// import CardRenderer from "@/components/canvas/CardRenderer";

export default function HomePage() {
  return (<>
  
      <CopilotChat
        labels={{
          title: "Copilot-chan",
          initial: "Hi! I'm connected to an agent. How can I help?",
        }}
      />
    <CopilotPopup />
  </>
  );
}
