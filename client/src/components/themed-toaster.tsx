"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function ThemedToaster() {
  const { resolvedTheme } = useTheme();

  return <Toaster theme={resolvedTheme === "light" || resolvedTheme === "dark" ? resolvedTheme : "system"} />;
}
