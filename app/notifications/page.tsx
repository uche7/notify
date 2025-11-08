"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Bell, BellOff, Home, RefreshCw, Settings, Moon } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { SearchInput } from "@/components/notifications/SearchInput";
import { ErrorMessage } from "@/components/notifications/ErrorMessage";
import { FilterButtons } from "@/components/notifications/FilterButtons";
import { LoadingSpinner } from "@/components/notifications/LoadingSpinner";
import { NotificationList } from "@/components/notifications/NotificationList";
import { ReadFilterToggle } from "@/components/notifications/ReadFilterToggle";
import { NotificationToast } from "@/components/notifications/NotificationToast";
import { useNotificationsController } from "@/lib/hooks/useNotificationsController";
import { NotificationToastProvider } from "@/components/context/NotificationToastContext";
import { NotificationFiltersProvider } from "@/components/context/NotificationFiltersContext";
import { NotificationInteractionsProvider } from "@/components/context/NotificationInteractionsContext";

/**
 * Notifications Page
 * @returns {JSX.Element} Notifications Page
 */
export default function NotificationsPage() {
  const {
    toastNotification,
    hideToast,
    showNewIndicator,
    unreadCount,
    readCount,
    readFilter,
    onReadFilterChange,
    filter,
    onFilterChange,
    searchQuery,
    onSearchChange,
    clearSearch,
    isLoading,
    isError,
    error,
    refetch,
    visibleNotifications,
    isFiltering,
    totalCount,
    filteredCount,
    visibleCountActual,
    loadMoreRef,
    hasMore,
    dataUpdatedAt,
    interactionsValue,
    settings,
  } = useNotificationsController();

  const filterContextValue = useMemo(
    () => ({
      filter,
      setFilter: onFilterChange,
      readFilter,
      setReadFilter: onReadFilterChange,
      searchQuery,
      setSearchQuery: onSearchChange,
      clearSearch,
    }),
    [
      filter,
      onFilterChange,
      readFilter,
      onReadFilterChange,
      searchQuery,
      onSearchChange,
      clearSearch,
    ]
  );

  const trimmedSearchQuery = searchQuery.trim();
  const displayTotalCount = isFiltering ? filteredCount : totalCount;
  const displayLabel =
    readFilter === "read"
      ? "read notifications"
      : readFilter === "unread"
      ? "unread notifications"
      : filter !== "all"
      ? `${filter} notifications`
      : isFiltering && trimmedSearchQuery
      ? "matching notifications"
      : displayTotalCount === 1
      ? "notification"
      : "notifications";
  const showingText = `Showing ${visibleCountActual} of ${displayTotalCount} ${displayLabel}`;
  const alertsChip = settings.alertsEnabled ? "Alerts on" : "Alerts off";
  const sleepModeChip = settings.sleepMode ? "Sleep mode on" : "Sleep mode off";
  const soundChip = settings.soundEnabled ? "Sound on" : "Sound off";

  return (
    <NotificationFiltersProvider value={filterContextValue}>
      <div className="min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
        <div className="pointer-events-none fixed top-6 right-4 z-50 flex flex-col gap-3 sm:right-6">
          {toastNotification && (
            <div className="pointer-events-auto">
              <NotificationToastProvider value={{ hideToast }}>
                <NotificationToast notification={toastNotification} />
              </NotificationToastProvider>
            </div>
          )}
        </div>
        <div className="mx-auto w-full max-w-4xl px-4 py-8 transition-colors sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-200">
                  <Bell className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100 sm:text-3xl">
                    Notifications
                  </h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-slate-300">
                    Stay updated with your latest notifications
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-3 self-end sm:self-auto">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-blue-600 px-3 py-1 text-sm font-semibold text-white dark:bg-blue-500">
                    {unreadCount}{" "}
                    {unreadCount === 1
                      ? "unread notification"
                      : "unread notifications"}
                  </span>
                  <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {readCount}{" "}
                    {readCount === 1
                      ? "read notification"
                      : "read notifications"}
                  </span>
                  {showNewIndicator && (
                    <div className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 animate-pulse dark:bg-green-500/15 dark:text-green-200">
                      <RefreshCw className="h-3 w-3" />
                      New
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-center justify-end gap-3">
                  <ReadFilterToggle />
                  <ThemeToggle />
                  <Link
                    href="/"
                    className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-transparent bg-white/70 px-3 py-1 text-sm font-medium text-gray-600 shadow-sm transition hover:border-blue-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-blue-500/40 dark:hover:text-blue-200"
                  >
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link
                    href="/notifications/settings"
                    className="inline-flex min-h-[36px] items-center gap-2 rounded-full border border-transparent bg-white/70 px-3 py-1 text-sm font-medium text-blue-600 shadow-sm transition hover:border-blue-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:bg-slate-900/60 dark:text-blue-300 dark:hover:border-blue-500/40 dark:hover:bg-slate-900"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2 text-xs text-gray-500 dark:text-slate-400">
                  <span className="rounded-full bg-white/70 px-2 py-1 font-medium text-gray-600 shadow-sm dark:bg-slate-900/60 dark:text-slate-300">
                    {alertsChip}
                  </span>
                  <span
                    className={`rounded-full px-2 py-1 font-medium shadow-sm ${
                      settings.sleepMode
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-100"
                        : "bg-white/70 text-gray-600 dark:bg-slate-900/60 dark:text-slate-300"
                    }`}
                  >
                    {sleepModeChip}
                  </span>
                  <span className="rounded-full bg-white/70 px-2 py-1 font-medium text-gray-600 shadow-sm dark:bg-slate-900/60 dark:text-slate-300">
                    {soundChip}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {!settings.alertsEnabled && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-700 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200">
              <BellOff className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p className="text-sm">
                Notification alerts are turned off. Enable them in settings if
                you want toast notifications.
              </p>
            </div>
          )}

          {settings.sleepMode && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100">
              <Moon className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <p className="text-sm">
                Sleep mode is on. Toast notifications are paused until you turn
                it off in settings.
              </p>
            </div>
          )}

          {/* Search + Filters */}
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:max-w-sm">
              <SearchInput />
            </div>
            <FilterButtons />
          </div>

          {/* Content */}
          {isLoading ? (
            <LoadingSpinner />
          ) : isError ? (
            <ErrorMessage
              message={error instanceof Error ? error.message : undefined}
              onRetry={refetch}
            />
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500 dark:text-slate-400">
                <span>{showingText}</span>
                {trimmedSearchQuery && (
                  <span className="text-xs uppercase tracking-wide text-gray-400 dark:text-slate-500">
                    Matching “{trimmedSearchQuery}”
                  </span>
                )}
              </div>
              <NotificationInteractionsProvider value={interactionsValue}>
                <NotificationList
                  notifications={visibleNotifications}
                  emptyTitle={
                    isFiltering
                      ? "No notifications match your filters"
                      : undefined
                  }
                  emptyMessage={
                    isFiltering
                      ? "Try adjusting your filters or clearing the search to see more results."
                      : undefined
                  }
                />
              </NotificationInteractionsProvider>
              <div
                ref={loadMoreRef}
                className="flex justify-center py-6"
                aria-hidden="true"
              >
                {hasMore ? (
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-slate-400">
                    <div className="relative h-8 w-8">
                      <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 dark:border-slate-700" />
                      <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-blue-500 dark:border-t-blue-400" />
                    </div>
                    <span className="font-medium text-gray-600 dark:text-slate-300">
                      Rolling in more notifications…
                    </span>
                  </div>
                ) : (
                  filteredCount > 0 && (
                    <p className="text-xs uppercase tracking-wide text-gray-400 dark:text-slate-500">
                      You’re all caught up
                    </p>
                  )
                )}
              </div>
            </div>
          )}

          {/* Last updated indicator */}
          {!isLoading && !isError && (
            <div className="mt-8 text-center text-xs text-gray-500 dark:text-slate-500">
              Last updated{" "}
              {new Date(dataUpdatedAt).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
              })}
              .
            </div>
          )}
        </div>
      </div>
    </NotificationFiltersProvider>
  );
}
