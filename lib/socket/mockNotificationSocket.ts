import type { Notification } from "@/lib/types/notification";
import { generateMockNotification } from "@/lib/utils/mockNotifications";

/** Notification Listener */
type NotificationListener = (notification: Notification) => void;

/** Mock Notification Socket */
class MockNotificationSocket {
  private listeners = new Set<NotificationListener>();
  private timeoutId: number | null = null;
  private isConnected = false;

  /** Start the mock notification socket */
  start() {
    if (this.isConnected) {
      return;
    }

    this.isConnected = true;

    if (typeof window === "undefined") {
      return;
    }

    // Kick off the first message shortly after connecting.
    this.scheduleNextPush(3_000);
  }

  /** Stop the mock notification socket */
  stop() {
    this.isConnected = false;

    if (typeof window === "undefined") {
      return;
    }

    if (this.timeoutId !== null) {
      window.clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

  /** Subscribe to the mock notification socket */
  subscribe(listener: NotificationListener) {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);

      if (this.listeners.size === 0) {
        this.stop();
      }
    };
  }

  /** Schedule the next push */
  private scheduleNextPush(delay?: number) {
    if (typeof window === "undefined") {
      return;
    }

    const interval =
      typeof delay === "number" ? delay : this.getRandomIntervalDuration();

    this.timeoutId = window.setTimeout(() => {
      if (!this.isConnected) {
        return;
      }

      const notification = generateMockNotification();
      this.broadcast(notification);
      this.scheduleNextPush();
    }, interval);
  }

  /** Get the random interval duration */
  private getRandomIntervalDuration() {
    // Randomly emit updates every 25-45 seconds to simulate organic traffic.
    const min = 25_000;
    const max = 45_000;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /** Broadcast the notification */
  private broadcast(notification: Notification) {
    this.listeners.forEach((listener) => listener(notification));
  }
}

const socket = new MockNotificationSocket();

/** Get the mock notification socket */
export function getMockNotificationSocket() {
  return socket;
}
