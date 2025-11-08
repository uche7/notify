"use client";

import { useMemo } from "react";
import { useTheme } from "next-themes";
import {
  Bell,
  BellOff,
  BellRing,
  CheckCircle2,
  Moon,
  Sun,
  Undo2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useNotificationSettingsForm } from "@/lib/hooks/useNotificationSettingsForm";
import { NotificationSettingsToggleRow } from "@/components/notifications/NotificationSettingsToggleRow";
import { NotificationSettingsActionButton } from "@/components/notifications/NotificationSettingsActionButton";

/**
 * Notification Settings Form
 * @returns {JSX.Element} Notification Settings Form
 */
export function NotificationSettingsForm() {
  const {
    settings,
    saveState,
    markState,
    markMessage,
    toggleSetting,
    markAll,
  } = useNotificationSettingsForm();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const saveMessage = useMemo(() => {
    switch (saveState) {
      case "saving":
        return "Saving changes…";
      case "saved":
        return "All changes saved";
      default:
        return "Changes are saved automatically";
    }
  }, [saveState]);

  const markStatusMessage = useMemo(() => {
    if (markState === "working") {
      return "Updating notifications…";
    }
    return markMessage;
  }, [markState, markMessage]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <div className="flex items-center gap-3">
          <BellRing className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100">
              Notification preferences
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-400">
              Control how alerts behave across the app.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-500">
          {saveMessage}
        </span>
      </div>

      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60 sm:p-6">
        <NotificationSettingsToggleRow
          title="Notification alerts"
          description="Enable or disable in-app alerts."
          enabled={settings.alertsEnabled}
          onToggle={() => toggleSetting("alertsEnabled")}
          enabledLabel="Alerts enabled"
          disabledLabel="Alerts disabled"
          iconEnabled={<Bell className="h-5 w-5" />}
          iconDisabled={<BellOff className="h-5 w-5" />}
        />

        <NotificationSettingsToggleRow
          title="Sleep mode"
          description="Pause alerts until you turn them back on."
          enabled={settings.sleepMode}
          onToggle={() => toggleSetting("sleepMode")}
          enabledLabel="Sleep mode on"
          disabledLabel="Sleep mode off"
          iconEnabled={<Moon className="h-5 w-5" />}
          iconDisabled={<Sun className="h-5 w-5" />}
        />

        <NotificationSettingsToggleRow
          title="Notification sounds"
          description="Play a sound when a new notification arrives."
          enabled={settings.soundEnabled}
          onToggle={() => toggleSetting("soundEnabled")}
          enabledLabel="Sound on"
          disabledLabel="Sound off"
          iconEnabled={<Volume2 className="h-5 w-5" />}
          iconDisabled={<VolumeX className="h-5 w-5" />}
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60 sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              Quick actions
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Update every notification with a single tap.
            </p>
          </div>
          {markStatusMessage && (
            <span
              className={`text-xs font-semibold ${
                markState === "error"
                  ? "text-rose-500"
                  : "text-gray-500 dark:text-slate-400"
              }`}
            >
              {markStatusMessage}
            </span>
          )}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <NotificationSettingsActionButton
            onClick={() => markAll("read")}
            loading={markState === "working"}
            icon={<CheckCircle2 className="h-4 w-4" />}
          >
            Mark all as read
          </NotificationSettingsActionButton>
          <NotificationSettingsActionButton
            onClick={() => markAll("unread")}
            loading={markState === "working"}
            icon={<Undo2 className="h-4 w-4" />}
            kind="secondary"
          >
            Mark all as unread
          </NotificationSettingsActionButton>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition dark:border-slate-800 dark:bg-slate-900/60 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-slate-100">
              Appearance
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">
              Switch between light and dark mode.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? (
              <>
                <Sun className="h-4 w-4" />
                Light mode
              </>
            ) : (
              <>
                <Moon className="h-4 w-4" />
                Dark mode
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
}
