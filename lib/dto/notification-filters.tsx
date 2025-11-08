import { CheckCircle2, Inbox, Mail } from "lucide-react";
import type { NotificationFilter } from "@/lib/types/notification";
import type { ReadFilterOption } from "@/lib/types/notification-props";

/** Notification Type Filters */
export const NOTIFICATION_TYPE_FILTERS: Array<{
  value: NotificationFilter;
  label: string;
}> = [
  { value: "all", label: "All" },
  { value: "info", label: "Info" },
  { value: "warning", label: "Warning" },
  { value: "success", label: "Success" },
  { value: "error", label: "Error" },
];

/** Read Filter Options */
export const READ_FILTER_OPTIONS: ReadFilterOption[] = [
  { value: "all", label: "All", icon: <Inbox className="h-4 w-4" /> },
  { value: "unread", label: "Unread", icon: <Mail className="h-4 w-4" /> },
  { value: "read", label: "Read", icon: <CheckCircle2 className="h-4 w-4" /> },
];
