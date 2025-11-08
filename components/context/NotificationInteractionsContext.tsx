"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { NotificationInteractionsContextValue } from "@/lib/types/notification-props";

/**
 * Notification Interactions Context
 * @type {Context<NotificationInteractionsContextValue | null>} Notification Interactions Context
 */
const NotificationInteractionsContext =
  createContext<NotificationInteractionsContextValue | null>(null);

/**
 * Notification Interactions Provider
 * @param {NotificationInteractionsProviderProps} props - The props for the NotificationInteractionsProvider component
 * @param {NotificationInteractionsContextValue} props.value - The value for the NotificationInteractionsContext
 * @param {ReactNode} props.children - The children to display in the NotificationInteractionsProvider
 * @returns {JSX.Element} Notification Interactions Provider
 */
export function NotificationInteractionsProvider({
  value,
  children,
}: {
  value: NotificationInteractionsContextValue;
  children: ReactNode;
}) {
  return (
    <NotificationInteractionsContext.Provider value={value}>
      {children}
    </NotificationInteractionsContext.Provider>
  );
}

/**
 * useNotificationInteractions
 * @returns {NotificationInteractionsContextValue} Notification Interactions Context Value
 */
export function useNotificationInteractions() {
  const context = useContext(NotificationInteractionsContext);
  if (!context) {
    throw new Error(
      "useNotificationInteractions must be used within a NotificationInteractionsProvider"
    );
  }
  return context;
}
