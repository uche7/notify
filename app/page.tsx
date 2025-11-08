import Link from "next/link";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NotificationToastHub } from "@/components/notifications/NotificationToastHub";

const highlights = [
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

const previewNotifications = [
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

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <NotificationToastHub />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-indigo-200/30 blur-3xl dark:bg-indigo-500/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-10">
        <header className="mb-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-3 text-sm font-medium text-gray-500 dark:text-slate-400">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white dark:bg-blue-500">
              <Bell className="h-5 w-5" />
            </div>
            <span>Notify · The modern notification workspace</span>
          </div>
          <ThemeToggle />
        </header>

        <main className="flex flex-1 flex-col gap-16 pb-16">
          <section className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-1 text-sm font-semibold text-blue-600 shadow-sm dark:border-blue-500/40 dark:bg-slate-900/60 dark:text-blue-300">
                <Sparkles className="h-4 w-4" />
                Real-time updates without the noise
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                Your notification command center, designed for focus
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-slate-300 lg:text-xl">
                See every important update the moment it happens, triage faster
                with keyboard-first controls, and keep your attention on what
                matters.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/notifications"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-200/60 transition hover:translate-y-[-1px] hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  View notifications
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/notifications/settings"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-blue-200 px-6 py-3 text-base font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-50 dark:border-blue-500/40 dark:text-blue-300 dark:hover:bg-blue-500/10"
                >
                  Customize alerts
                </Link>
              </div>
              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-3 rounded-xl border border-transparent bg-white/70 p-4 shadow-sm backdrop-blur dark:bg-slate-900/60"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-300">
                      {item.icon}
                    </div>
                    <div>
                      <dt className="text-sm font-semibold text-gray-900 dark:text-slate-100">
                        {item.title}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-600 dark:text-slate-300">
                        {item.description}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -rotate-3 rounded-3xl bg-gradient-to-br from-blue-200 to-indigo-200 blur-xl dark:from-blue-500/30 dark:to-indigo-500/30" />
              <div className="relative rounded-3xl border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                <div className="mb-5 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-500">
                      Live stream
                    </p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      3 new updates • just now
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200">
                    In sync
                  </span>
                </div>
                <div className="space-y-4">
                  {previewNotifications.map((notification) => (
                    <article
                      key={notification.title}
                      className="rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-sm transition hover:-translate-y-[1px] hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:bg-blue-500/20 dark:text-blue-200">
                          {notification.badge}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">
                        {notification.body}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
