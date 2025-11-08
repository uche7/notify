import type { Notification } from "@/lib/types/notification";
import { NOTIFICATION_TYPES } from "@/lib/constants/notifications";
import {
  MOCK_NOTIFICATION_TITLES,
  MOCK_NOTIFICATION_MESSAGES,
} from "@/lib/dto/mock-notification-content";

let mockNotificationId = 10_000;

/** Pick a random item from an array */
function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Generate a mock notification */
export function generateMockNotification(): Notification {
  const id = mockNotificationId++;
  const type = pickRandom(NOTIFICATION_TYPES);
  const title = pickRandom(MOCK_NOTIFICATION_TITLES);
  const message = pickRandom(MOCK_NOTIFICATION_MESSAGES);

  return {
    id,
    title,
    message,
    type,
    isRead: false,
    createdAt: new Date().toISOString(),
    userId: Math.floor(Math.random() * 10) + 1,
  };
}
