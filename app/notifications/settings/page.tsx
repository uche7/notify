import Link from "next/link";
import { NotificationSettingsForm } from "@/components/notifications/NotificationSettingsForm";
import { ArrowLeft, BellRing } from "lucide-react";
import { NotificationToastHub } from "@/components/notifications/NotificationToastHub";

export default function NotificationSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <NotificationToastHub />
      <div className="mx-auto max-w-4xl px-4 py-8 transition-colors sm:px-6 lg:px-8">
        <header className="mb-8 space-y-4">
          <Link
            href="/notifications"
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-white px-3 py-1 text-sm font-medium text-gray-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:border-blue-500/40 dark:hover:text-blue-200"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to notifications
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200">
              <BellRing className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 sm:text-3xl">
                Notification settings
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">
                Choose the alerts you want to receive and how you want to be
                informed.
              </p>
            </div>
          </div>
        </header>

        <NotificationSettingsForm />
      </div>
    </div>
  );
}


