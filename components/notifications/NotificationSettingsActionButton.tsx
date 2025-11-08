"use client";

import type { NotificationSettingsActionButtonProps } from "@/lib/types/notification-settings-components";

/**
 * Notification Settings Action Button
 * @param {NotificationSettingsActionButtonProps} props - The props for the Notification Settings Action Button
 * @returns {JSX.Element} Notification Settings Action Button
 */
export function NotificationSettingsActionButton({
  onClick,
  loading,
  icon,
  kind = "primary",
  children,
}: NotificationSettingsActionButtonProps) {
  const baseStyles =
    "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed";
  const variantStyles =
    kind === "primary"
      ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700 disabled:bg-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 disabled:bg-gray-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`${baseStyles} ${variantStyles}`}
    >
      {icon}
      {loading ? "Working…" : children}
    </button>
  );
}
