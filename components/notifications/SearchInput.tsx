"use client";

import { useEffect, useRef } from "react";
import { X, Search } from "lucide-react";
import type { SearchInputProps } from "@/lib/types/notification-props";
import { useNotificationFilters } from "@/components/context/NotificationFiltersContext";

/**
 * Search Input
 * @param {SearchInputProps} props - The props for the SearchInput component
 * @param {string} props.placeholder - The placeholder for the search input
 * @returns {JSX.Element} Search Input
 */
export function SearchInput({
  placeholder = "Search notifications...",
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { searchQuery, setSearchQuery, clearSearch } = useNotificationFilters();

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key !== "/") {
        return;
      }

      const active = document.activeElement as HTMLElement | null;
      const isTyping =
        active && (active.tagName === "INPUT" || active.tagName === "TEXTAREA");
      if (isTyping) {
        return;
      }

      event.preventDefault();
      inputRef.current?.focus();
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500" />
      <input
        ref={inputRef}
        type="search"
        value={searchQuery}
        placeholder={placeholder}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm text-gray-700 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-400 dark:focus:border-blue-400 dark:focus:ring-blue-500/40"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Clear search"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
      <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 text-xs font-medium text-gray-400 dark:text-slate-500 sm:block">
        /
      </div>
    </div>
  );
}
