import type { NotificationType } from "@/lib/types/notification";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

/**
 * Notification Type Config
 * @returns {Record<NotificationType, { icon: typeof Info; bgColor: string; borderColor: string; iconColor: string; badgeColor: string; accent: string; }>} Notification Type Config
 */
export const NOTIFICATION_TYPE_CONFIG: Record<
  NotificationType,
  {
    icon: typeof Info;
    bgColor: string;
    borderColor: string;
    iconColor: string;
    badgeColor: string;
    accent: string;
  }
> = {
  info: {
    icon: Info,
    bgColor: "bg-blue-50 dark:bg-blue-500/15",
    borderColor: "border-blue-200 dark:border-blue-500/30",
    iconColor: "text-blue-600 dark:text-blue-200",
    badgeColor:
      "bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-100",
    accent: "bg-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    bgColor: "bg-yellow-50 dark:bg-amber-500/15",
    borderColor: "border-yellow-200 dark:border-amber-500/30",
    iconColor: "text-yellow-600 dark:text-amber-300",
    badgeColor:
      "bg-yellow-100 text-yellow-800 dark:bg-amber-500/20 dark:text-amber-100",
    accent: "bg-yellow-500",
  },
  success: {
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-emerald-500/15",
    borderColor: "border-green-200 dark:border-emerald-500/30",
    iconColor: "text-green-600 dark:text-emerald-200",
    badgeColor:
      "bg-green-100 text-green-800 dark:bg-emerald-500/20 dark:text-emerald-100",
    accent: "bg-green-500",
  },
  error: {
    icon: XCircle,
    bgColor: "bg-red-50 dark:bg-rose-500/15",
    borderColor: "border-red-200 dark:border-rose-500/30",
    iconColor: "text-red-600 dark:text-rose-200",
    badgeColor:
      "bg-red-100 text-red-800 dark:bg-rose-500/20 dark:text-rose-100",
    accent: "bg-red-500",
  },
};
