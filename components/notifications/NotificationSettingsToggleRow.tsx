"use client";

import type { NotificationSettingsToggleRowProps } from "@/lib/types/notification-settings-components";

/**
 * Notification Settings Toggle Row
 * @returns {JSX.Element} Notification Settings Toggle Row
 */
export function NotificationSettingsToggleRow({
  title,
  description,
  enabled,
  onToggle,
  enabledLabel,
  disabledLabel,
  iconEnabled,
  iconDisabled,
}: NotificationSettingsToggleRowProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 p-4 transition hover:border-blue-200 dark:border-slate-800 dark:hover:border-blue-500/40 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-slate-400">
          {description}
        </p>
      </div>
      <button
        type="button"
        onClick={onToggle}
        className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
          enabled
            ? "bg-blue-600 text-white shadow-sm dark:bg-blue-500"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        }`}
      >
        <span className="flex items-center gap-2">
          {enabled ? iconEnabled : iconDisabled}
          {enabled ? enabledLabel : disabledLabel}
        </span>
      </button>
    </div>
  );
}
