"use client";

import { NotificationToast } from "@/components/notifications/NotificationToast";
import { useNotificationsController } from "@/lib/hooks/useNotificationsController";
import { NotificationToastProvider } from "@/components/context/NotificationToastContext";

/**
 * Notification Toast Hub
 * Renders floating notification toasts anywhere outside the notifications page.
 */
export function NotificationToastHub() {
  const { toastNotification, hideToast } = useNotificationsController();

  if (!toastNotification) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed top-6 right-6 z-50 flex flex-col gap-3">
      <div className="pointer-events-auto">
        <NotificationToastProvider value={{ hideToast }}>
          <NotificationToast notification={toastNotification} />
        </NotificationToastProvider>
      </div>
    </div>
  );
}


