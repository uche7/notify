"use client";

import { X } from "lucide-react";
import { NOTIFICATION_TYPE_CONFIG } from "./typeStyles";
import type { NotificationToastProps } from "@/lib/types/notification-props";
import { useNotificationToast } from "@/components/context/NotificationToastContext";

/**
 * Notification Toast
 * @param {NotificationToastProps} props - The props for the NotificationToast component
 * @param {Notification} props.notification - The notification to display
 * @returns {JSX.Element} Notification Toast
 */
export function NotificationToast({ notification }: NotificationToastProps) {
  const config = NOTIFICATION_TYPE_CONFIG[notification.type];
  const Icon = config.icon;
  const { hideToast } = useNotificationToast();

  return (
    <div
      className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg ring-1 ring-black/5 dark:border-slate-800 dark:bg-slate-900/80 dark:ring-white/10"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start p-4">
        <div
          className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bgColor} ${config.iconColor}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-wrap text-sm font-semibold text-gray-900 capitalize dark:text-slate-100">
            {notification.title}
          </p>
        </div>
        <button
          type="button"
          onClick={hideToast}
          className="ml-3 inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="h-1 w-full">
        <div
          className={`h-full w-full ${config.accent} animate-[shrink_4s_linear_forwards]`}
        />
      </div>
      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
