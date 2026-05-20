"use client";

import { Agentation } from "agentation";

const isDevelopment = process.env.NODE_ENV === "development";

export function AgentationProvider() {
  if (!isDevelopment) {
    return null;
  }

  return <Agentation />;
}
