import { CheckCircle2, Sparkles } from "lucide-react";

/** Home Highlights */
export const HOME_HIGHLIGHTS = [
  {
    title: "Mark as handled",
    description: "One-tap read toggles keep your queue focused.",
    icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
  },
  {
    title: "Toast everywhere",
    description: "Stay in the loop even while adjusting preferences.",
    icon: <Sparkles className="h-5 w-5 text-blue-500" />,
  },
];

/** Home Preview Notifications */
export const HOME_PREVIEW_NOTIFICATIONS = [
  {
    title: "Product launch ready",
    body: "Your release checklist is green across all services.",
    badge: "success",
  },
  {
    title: "Unusual login detected",
    body: "We spotted a new device in Berlin. Review the activity log.",
    badge: "warning",
  },
  {
    title: "System maintenance window",
    body: "Scheduled downtime on Friday at 02:00 UTC.",
    badge: "info",
  },
];
