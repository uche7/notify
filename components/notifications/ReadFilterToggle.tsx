"use client";

import { READ_FILTER_OPTIONS } from "@/lib/dto/notification-filters";
import { useNotificationFilters } from "@/components/context/NotificationFiltersContext";

/**
 * Read Filter Toggle
 * @returns {JSX.Element} Read Filter Toggle
 */
export function ReadFilterToggle() {
  const { readFilter, setReadFilter } = useNotificationFilters();
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white/60 p-1 shadow-sm transition dark:border-slate-700 dark:bg-slate-900/60">
      {READ_FILTER_OPTIONS.map((option) => {
        const isActive = option.value === readFilter;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setReadFilter(option.value)}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950 ${
              isActive
                ? "bg-blue-600 text-white shadow dark:bg-blue-500"
                : "text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
            aria-pressed={isActive}
          >
            <span className="flex items-center gap-1">
              {option.icon}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
