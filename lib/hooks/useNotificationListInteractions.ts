"use client";

import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import type { Notification } from "@/lib/types/notification";
import { useNotificationInteractions } from "@/components/context/NotificationInteractionsContext";

/**
 * useNotificationListInteractions
 * @param {Notification[]} notifications - The notifications to interact with
 * @returns {Object} The interactions object
 * @returns {Function} getTabIndex - The function to get the tab index
 * @returns {Function} registerItem - The function to register an item
 * @returns {Function} handleFocus - The function to handle focus
 * @returns {Function} handlePointerDown - The function to handle pointer down
 * @returns {Function} handleKeyDown - The function to handle key down
 */
export function useNotificationListInteractions(notifications: Notification[]) {
  const { focusIndex, setFocusIndex, activateNotification } =
    useNotificationInteractions();
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, notifications.length);
  }, [notifications.length]);

  useEffect(() => {
    if (focusIndex == null) {
      return;
    }
    const node = itemRefs.current[focusIndex];
    if (node && document.activeElement !== node) {
      node.focus();
    }
  }, [focusIndex, notifications.length]);

  const registerItem = useCallback(
    (index: number) => (node: HTMLDivElement | null) => {
      itemRefs.current[index] = node;
    },
    []
  );

  const getTabIndex = useCallback(
    (index: number) =>
      focusIndex != null ? (focusIndex === index ? 0 : -1) : 0,
    [focusIndex]
  );

  const handleFocus = useCallback(
    (index: number) => {
      setFocusIndex(index);
    },
    [setFocusIndex]
  );

  const handlePointerDown = handleFocus;

  const handleKeyDown = useCallback(
    (index: number, notification: Notification) =>
      (event: KeyboardEvent<HTMLDivElement>) => {
        const total = notifications.length;
        if (total === 0) {
          return;
        }

        if (
          event.key === "ArrowDown" ||
          event.key === "j" ||
          event.key === "J"
        ) {
          event.preventDefault();
          const nextIndex = (index + 1) % total;
          setFocusIndex(nextIndex);
        } else if (
          event.key === "ArrowUp" ||
          event.key === "k" ||
          event.key === "K"
        ) {
          event.preventDefault();
          const nextIndex = (index - 1 + total) % total;
          setFocusIndex(nextIndex);
        } else if (event.key === "Home") {
          event.preventDefault();
          setFocusIndex(0);
        } else if (event.key === "End") {
          event.preventDefault();
          setFocusIndex(total - 1);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateNotification(notification);
        }
      },
    [notifications, setFocusIndex, activateNotification]
  );

  return {
    getTabIndex,
    registerItem,
    handleFocus,
    handlePointerDown,
    handleKeyDown,
  };
}
