import type { ReactNode } from "react";
import type { Notification, NotificationFilter } from "./notification";

/** Read Filter */
export type ReadFilter = "all" | "unread" | "read";

/** Search Input Props */
export interface SearchInputProps {
  placeholder?: string;
}

/** Notification Interactions Context Value */
export interface NotificationInteractionsContextValue {
  markAsRead: (id: number) => void;
  focusIndex: number | null;
  setFocusIndex: (index: number | null) => void;
  activateNotification: (notification: Notification) => void;
}

/** Notification Filters Context Value */
export interface NotificationFiltersContextValue {
  filter: NotificationFilter;
  setFilter: (filter: NotificationFilter) => void;
  readFilter: ReadFilter;
  setReadFilter: (filter: ReadFilter) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  clearSearch: () => void;
}

/** Read Filter Option */
export interface ReadFilterOption {
  label: string;
  value: ReadFilter;
  icon: ReactNode;
}

/** Notification Card Props */
export interface NotificationCardProps {
  notification: Notification;
}

/** Notification List Props */
export interface NotificationListProps {
  notifications: Notification[];
  emptyTitle?: string;
  emptyMessage?: string;
}

/** Notification Toast Props */
export interface NotificationToastProps {
  notification: Notification;
}

/** Error Message Props */
export interface ErrorMessageProps {
  message?: string;
  onRetry?: () => void;
}
