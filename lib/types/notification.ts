/** Notification Type */
export type NotificationType = "info" | "warning" | "success" | "error";

/** Notification Filter */
export type NotificationFilter = "all" | NotificationType;

/** Notification */
export interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  createdAt: string;
  userId: number;
}
