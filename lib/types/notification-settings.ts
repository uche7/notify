"use client";

/** Notification Settings */
export interface NotificationSettings {
  alertsEnabled: boolean;
  sleepMode: boolean;
  soundEnabled: boolean;
}

/** Notification Settings Storage Key */
export const NOTIFICATION_SETTINGS_STORAGE_KEY = "notification-center.settings";

/** Default Notification Settings */
export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  alertsEnabled: true,
  sleepMode: false,
  soundEnabled: true,
};
