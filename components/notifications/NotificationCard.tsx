"use client";

import { Check } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils/date";
import { NOTIFICATION_TYPE_CONFIG } from "./typeStyles";
import type { NotificationCardProps } from "@/lib/types/notification-props";
import { useNotificationInteractions } from "@/components/context/NotificationInteractionsContext";

/**
 * Notification Card
 * @param {NotificationCardProps} props - The props for the NotificationCard component
 * @param {Notification} props.notification - The notification to display
 * @returns {JSX.Element} Notification Card
 */
export function NotificationCard({ notification }: NotificationCardProps) {
  const config = NOTIFICATION_TYPE_CONFIG[notification.type];
  const Icon = config.icon;
  const { markAsRead } = useNotificationInteractions();

  return (
    <div
      className={`
        relative p-4 rounded-[24px] border-2 transition-all
        ${
          notification.isRead
            ? "bg-white border-gray-200 dark:bg-slate-900/60 dark:border-slate-800"
            : `${config.bgColor} ${config.borderColor} shadow-sm dark:shadow-slate-900/50`
        }
        hover:shadow-md
      `}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {/* Icon */}
        <div
          className={`
            flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full
            ${config.bgColor} ${config.iconColor}
          `}
        >
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
            <h3
              className={`
                text-base font-semibold capitalize
                ${
                  notification.isRead
                    ? "text-gray-700 dark:text-slate-300"
                    : "text-gray-900 dark:text-white"
                }
              `}
            >
              {notification.title}
            </h3>
            {!notification.isRead && (
              <span
                className={`
                  flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full
                  ${config.badgeColor}
                `}
              >
                {notification.type}
              </span>
            )}
          </div>

          <p
            className={`
              text-sm mb-2
              ${
                notification.isRead
                  ? "text-gray-600 dark:text-slate-400"
                  : "text-gray-700 dark:text-slate-200"
              }
            `}
          >
            {notification.message}
          </p>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-gray-500 dark:text-slate-400">
              {formatRelativeTime(notification.createdAt)}
            </span>

            {!notification.isRead && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="
                  inline-flex min-h-[36px] items-center gap-1 rounded-md px-3 py-1.5
                  text-xs font-medium text-blue-600 dark:text-blue-300
                  transition-colors hover:bg-blue-50 dark:hover:bg-blue-500/10
                "
                aria-label="Mark as read"
              >
                <Check className="w-3.5 h-3.5" />
                Mark as read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Unread indicator dot */}
      {!notification.isRead && (
        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400"></div>
      )}
    </div>
  );
}
