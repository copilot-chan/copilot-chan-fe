"use client";

import { SearchMemoryAction } from "./items/SearchMemoryAction";
import { SaveMemoryAction } from "./items/SaveMemoryAction";
import { GoogleSearchAction } from "./items/GoogleSearchAction";

export function CopilotActions() {
  return (
    <>
      <SearchMemoryAction />
      <SaveMemoryAction />
      <GoogleSearchAction />
    </>
  );
}
