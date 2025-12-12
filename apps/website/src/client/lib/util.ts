import { clsx } from "clsx";
import { useState } from "react";

import { twMerge } from "tailwind-merge";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import type { ClassValue } from "clsx";

export function canUseDOM() {
  const [isClient, setIsClient] = useState(false);

  useIsomorphicLayoutEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
) {
  if (
    !to ||
    typeof to !== "string" ||
    !to.startsWith("/") ||
    to.startsWith("//")
  ) {
    return "/";
  }
  return to;
}
