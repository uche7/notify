"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * Theme Toggle
 * @returns {JSX.Element} Theme Toggle
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-600 shadow-sm transition hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-blue-500/60 dark:hover:text-blue-300"
      aria-label="Toggle theme"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </button>
  );
}
