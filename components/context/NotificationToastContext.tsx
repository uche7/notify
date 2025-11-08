"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface NotificationToastContextValue {
  hideToast: () => void;
}

const NotificationToastContext =
  createContext<NotificationToastContextValue | null>(null);

/**
 * Notification Toast Provider
 * @param value - The value of the context
 * @param children - The children of the context
 * @returns {JSX.Element} Notification Toast Provider
 */
export function NotificationToastProvider({
  value,
  children,
}: {
  value: NotificationToastContextValue;
  children: ReactNode;
}) {
  return (
    <NotificationToastContext.Provider value={value}>
      {children}
    </NotificationToastContext.Provider>
  );
}

/**
 * useNotificationToast
 * @returns {NotificationToastContextValue} Notification Toast Context Value
 */
export function useNotificationToast() {
  const context = useContext(NotificationToastContext);
  if (!context) {
    throw new Error(
      "useNotificationToast must be used within a NotificationToastProvider"
    );
  }
  return context;
}
