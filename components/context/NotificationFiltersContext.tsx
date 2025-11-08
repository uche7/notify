"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { NotificationFiltersContextValue } from "@/lib/types/notification-props";

/**
 * Notification Filters Context
 */
const NotificationFiltersContext =
  createContext<NotificationFiltersContextValue | null>(null);

/**
 * Notification Filters Provider
 * @param value - The value of the context
 * @param children - The children of the context
 * @returns {JSX.Element} Notification Filters Provider
 */
export function NotificationFiltersProvider({
  value,
  children,
}: {
  value: NotificationFiltersContextValue;
  children: ReactNode;
}) {
  return (
    <NotificationFiltersContext.Provider value={value}>
      {children}
    </NotificationFiltersContext.Provider>
  );
}

/**
 * useNotificationFilters
 * @returns {NotificationFiltersContextValue} Notification Filters Context Value
 */
export function useNotificationFilters() {
  const context = useContext(NotificationFiltersContext);
  if (!context) {
    throw new Error(
      "useNotificationFilters must be used within a NotificationFiltersProvider"
    );
  }
  return context;
}
