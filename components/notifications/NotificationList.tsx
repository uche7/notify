"use client";

import { Bell } from "lucide-react";
import { NotificationCard } from "./NotificationCard";
import { AnimatePresence, motion } from "framer-motion";
import type { NotificationListProps } from "@/lib/types/notification-props";
import { useNotificationListInteractions } from "@/lib/hooks/useNotificationListInteractions";

/**
 * Notification List
 * @param {NotificationListProps} props - The props for the NotificationList component
 * @param {Notification[]} props.notifications - The notifications to display
 * @param {string} props.emptyTitle - The title to display when there are no notifications
 * @param {string} props.emptyMessage - The message to display when there are no notifications
 * @returns {JSX.Element} Notification List
 */
export function NotificationList({
  notifications,
  emptyTitle = "No notifications",
  emptyMessage = "You're all caught up! There are no notifications to display.",
}: NotificationListProps) {
  const {
    getTabIndex,
    registerItem,
    handleFocus,
    handlePointerDown,
    handleKeyDown,
  } = useNotificationListInteractions(notifications);

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500">
          <Bell className="h-8 w-8" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">
          {emptyTitle}
        </h3>
        <p className="mx-auto max-w-md text-gray-600 dark:text-slate-400">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className="space-y-4 [perspective:1200px]"
      role="list"
      aria-label="Notifications"
    >
      <AnimatePresence initial={false}>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            layout
            initial={{ opacity: 0, y: 48, rotateX: -75 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: 32, rotateX: 65 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay: Math.min(index * 0.05, 0.3),
            }}
            style={{
              transformOrigin: "center top",
              transformStyle: "preserve-3d",
            }}
            tabIndex={getTabIndex(index)}
            role="listitem"
            ref={registerItem(index)}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-blue-400 dark:focus-visible:ring-offset-slate-950 rounded-xl"
            onFocus={() => handleFocus(index)}
            onPointerDown={() => handlePointerDown(index)}
            onKeyDown={handleKeyDown(index, notification)}
          >
            <NotificationCard notification={notification} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
