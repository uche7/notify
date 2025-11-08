"use client";

export interface NotificationSettings {
  alertsEnabled: boolean;
  sleepMode: boolean;
  soundEnabled: boolean;
}

export const NOTIFICATION_SETTINGS_STORAGE_KEY = "notification-center.settings";

export const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  alertsEnabled: true,
  sleepMode: false,
  soundEnabled: true,
};


