"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { fetchNotifications } from "@/lib/api/notifications";
import { useNotificationSettings } from "@/lib/hooks/useNotificationSettings";
import type { NotificationSettings } from "@/lib/types/notification-settings";

type SaveState = "idle" | "saving" | "saved";
type MarkState = "idle" | "working" | "success" | "error";
type Mode = "read" | "unread";

const READ_STORAGE_KEY = "notification-center.readIds";
const READ_IDS_UPDATED_EVENT = "notification-center:readIdsUpdated";

function useSaveIndicator(): [SaveState, () => void] {
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const saveTimerRef = useRef<number | null>(null);

  /**
   * Cleanup function to clear the save timer when the component unmounts
   */
  useEffect(
    () => () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    },
    []
  );

  /**
   * Indicate that the settings are being saved
   */
  const indicateSaving = useCallback(() => {
    setSaveState("saving");
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      setSaveState("saved");
    }, 400);
  }, []);

  return [saveState, indicateSaving];
}

/**
 * Hook to manage the mark state
 * @returns {Array} An array containing the mark state, mark message, and functions to set the mark state and mark message
 */
function useMarkState(): [
  MarkState,
  string | null,
  Dispatch<SetStateAction<MarkState>>,
  Dispatch<SetStateAction<string | null>>
] {
  const [markState, setMarkState] = useState<MarkState>("idle");
  const [markMessage, setMarkMessage] = useState<string | null>(null);
  return [markState, markMessage, setMarkState, setMarkMessage];
}

/**
 * Hook to manage the notification settings form
 * @returns {Object} An object containing the notification settings, save state, mark state, mark message, and functions to toggle a setting and mark all as read or unread
 */
export function useNotificationSettingsForm() {
  const { settings, updateSettings } = useNotificationSettings();
  const [saveState, indicateSaving] = useSaveIndicator();
  const [markState, markMessage, setMarkState, setMarkMessage] = useMarkState();

  const toggleSetting = useCallback(
    (key: keyof NotificationSettings) => {
      indicateSaving();
      updateSettings((previous) => ({
        [key]: !previous[key],
      }));
    },
    [indicateSaving, updateSettings]
  );

  const markAll = useCallback(
    async (mode: Mode) => {
      if (typeof window === "undefined") {
        return;
      }
      setMarkState("working");
      setMarkMessage(null);
      try {
        if (mode === "read") {
          const notifications = await fetchNotifications();
          const ids = notifications.map((notification) => notification.id);
          window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify(ids));
        } else {
          window.localStorage.setItem(READ_STORAGE_KEY, JSON.stringify([]));
        }
        window.dispatchEvent(new Event(READ_IDS_UPDATED_EVENT));
        const successMessage =
          mode === "read"
            ? "All notifications marked as read."
            : "All notifications marked as unread.";
        setMarkState("success");
        setMarkMessage(successMessage);
        window.setTimeout(() => {
          setMarkState("idle");
          setMarkMessage(null);
        }, 2000);
      } catch (error) {
        console.warn("Failed to update read state", error);
        setMarkState("error");
        setMarkMessage("Something went wrong. Please try again.");
      }
    },
    [setMarkMessage, setMarkState]
  );

  return {
    settings,
    saveState,
    markState,
    markMessage,
    toggleSetting,
    markAll,
  };
}
