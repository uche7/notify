"use client";

import type { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Theme Provider
 * @param {ReactNode} children - The children to display in the ThemeProvider
 * @returns {JSX.Element} Theme Provider
 * @example
 * <ThemeProvider>
 *   <Component />
 * </ThemeProvider>
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
