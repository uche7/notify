"use client";

import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_NOTIFICATION_SETTINGS,
  NOTIFICATION_SETTINGS_STORAGE_KEY,
  type NotificationSettings,
} from "@/lib/types/notification-settings";

export const SETTINGS_UPDATED_EVENT = "notification-settings:updated";

function readSettingsFromStorage(): NotificationSettings {
  if (typeof window === "undefined") {
    return DEFAULT_NOTIFICATION_SETTINGS;
  }
  try {
    const stored = window.localStorage.getItem(
      NOTIFICATION_SETTINGS_STORAGE_KEY
    );
    if (!stored) {
      return DEFAULT_NOTIFICATION_SETTINGS;
    }
    const parsed = JSON.parse(stored) as Partial<NotificationSettings>;
    return {
      ...DEFAULT_NOTIFICATION_SETTINGS,
      ...parsed,
    };
  } catch (error) {
    console.warn("Failed to parse notification settings", error);
    return DEFAULT_NOTIFICATION_SETTINGS;
  }
}

function persistSettings(next: NotificationSettings) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(
      NOTIFICATION_SETTINGS_STORAGE_KEY,
      JSON.stringify(next)
    );
    window.dispatchEvent(
      new CustomEvent<NotificationSettings>(SETTINGS_UPDATED_EVENT, {
        detail: next,
      })
    );
  } catch (error) {
    console.warn("Failed to persist notification settings", error);
  }
}

export function useNotificationSettings() {
  const [settings, setSettings] = useState<NotificationSettings>(() =>
    readSettingsFromStorage()
  );

  const refresh = useCallback(() => {
    setSettings(readSettingsFromStorage());
  }, []);

  const applyUpdate = useCallback(
    (updater: Partial<NotificationSettings> | ((prev: NotificationSettings) => Partial<NotificationSettings>)) => {
      setSettings((previous) => {
        const patch =
          typeof updater === "function" ? updater(previous) : updater;
        const next = { ...previous, ...patch };
        persistSettings(next);
        return next;
      });
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleStorage = (event: StorageEvent) => {
      if (event.key === NOTIFICATION_SETTINGS_STORAGE_KEY) {
        refresh();
      }
    };

    const handleCustomUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<NotificationSettings>;
      if (customEvent.detail) {
        setSettings({
          ...DEFAULT_NOTIFICATION_SETTINGS,
          ...customEvent.detail,
        });
      } else {
        refresh();
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(SETTINGS_UPDATED_EVENT, handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SETTINGS_UPDATED_EVENT, handleCustomUpdate);
    };
  }, [refresh]);

  return {
    settings,
    refresh,
    updateSettings: applyUpdate,
  };
}


