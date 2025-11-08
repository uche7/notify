"use client";

import { NOTIFICATION_TYPE_FILTERS } from "@/lib/dto/notification-filters";
import { useNotificationFilters } from "@/components/context/NotificationFiltersContext";

/**
 * Filter Buttons
 * @returns {JSX.Element} Filter Buttons
 */
export function FilterButtons() {
  const { filter: activeFilter, setFilter } = useNotificationFilters();
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {NOTIFICATION_TYPE_FILTERS.map((option) => {
        const isActive = option.value === activeFilter;
        return (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-md dark:bg-blue-500"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:bg-slate-800"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
