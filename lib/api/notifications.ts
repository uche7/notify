import axios from "axios";
import type { Notification } from "@/lib/types/notification";
import { NOTIFICATION_TYPES } from "@/lib/constants/notifications";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

/**
 * Transform a post from JSONPlaceholder to a Notification
 * @param {Object} post - The post to transform
 * @param {number} post.id - The ID of the post
 * @param {string} post.title - The title of the post
 * @param {string} post.body - The body of the post
 * @param {number} post.userId - The user ID of the post
 * @returns {Notification} The transformed notification
 */
export function transformPostToNotification(post: {
  id: number;
  title: string;
  body: string;
  userId: number;
}): Notification {
  // Cycle through notification types based on ID for consistency
  const type = NOTIFICATION_TYPES[post.id % NOTIFICATION_TYPES.length];

  // Realistic date (subtract days based on ID to create variety)
  const daysAgo = post.id % 30; // 0-29 days ago
  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);
  createdAt.setHours(
    Math.floor(Math.random() * 24),
    Math.floor(Math.random() * 60),
    0,
    0
  );

  return {
    id: post.id,
    title: post.title,
    message: post.body,
    type,
    isRead: false, // All start as unread
    createdAt: createdAt.toISOString(),
    userId: post.userId,
  };
}

// Fetch notifications from JSONPlaceholder
export async function fetchNotifications(): Promise<Notification[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`);
    const posts = response.data;

    // Transform posts to notifications
    return posts.map(transformPostToNotification);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch notifications: ${error.message}`);
    }
    throw new Error("Failed to fetch notifications: Unknown error");
  }
}

// Simulate marking a notification as read
// Since JSONPlaceholder doesn't support PATCH, it will be handled in component state
export async function markNotificationAsRead(
  _notificationId: number
): Promise<Notification> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  void _notificationId;
  // In a real app, this would make a PATCH request
  // For now, it will throw an error to demonstrate error handling
  // but in practice, this will be handled by local state updates
  throw new Error("Mark as read is handled locally via state management");
}
