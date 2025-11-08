import type { ReactNode } from "react";

/** Notification Settings ToggleRowProps type */
export interface NotificationSettingsToggleRowProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  enabledLabel: string;
  disabledLabel: string;
  iconEnabled: ReactNode;
  iconDisabled: ReactNode;
}

/** Notification Settings ActionButtonProps type */
export interface NotificationSettingsActionButtonProps {
  onClick: () => void;
  loading: boolean;
  icon: ReactNode;
  kind?: "primary" | "secondary";
  children: ReactNode;
}
