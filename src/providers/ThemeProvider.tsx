"use client";

import { useEffect } from "react";
import { useTheme } from "@/store/theme.store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  useEffect(() => {
    // Update theme on client side
    document.documentElement.setAttribute("data-mode", theme);
    document.documentElement.className = theme;
  }, [theme]);

  return <>{children}</>;
}
