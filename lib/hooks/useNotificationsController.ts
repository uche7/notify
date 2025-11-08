"use client";

import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  type RefObject,
} from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Fuse from "fuse.js";
import { fetchNotifications } from "@/lib/api/notifications";
import { getMockNotificationSocket } from "@/lib/socket/mockNotificationSocket";
import { useNotificationSettings } from "@/lib/hooks/useNotificationSettings";
import type {
  Notification,
  NotificationFilter,
} from "@/lib/types/notification";
import type {
  ReadFilter,
  NotificationInteractionsContextValue,
} from "@/lib/types/notification-props";
import type { NotificationSettings } from "@/lib/types/notification-settings";

/** Page Size */
const PAGE_SIZE = 12;
/** Read Storage Key */
const READ_STORAGE_KEY = "notification-center.readIds";
const READ_IDS_UPDATED_EVENT = "notification-center:readIdsUpdated";
const DEFAULT_REFETCH_INTERVAL = 30_000;

function parseStoredReadIds(stored: string | null): number[] {
  if (!stored) {
    return [];
  }
  try {
    const parsed = JSON.parse(stored) as number[];
    if (Array.isArray(parsed)) {
      return parsed.filter((value) => Number.isInteger(value));
    }
  } catch (error) {
    console.warn("Failed to parse stored read notifications", error);
  }
  return [];
}

function areSetsEqual(a: Set<number>, b: Set<number>) {
  if (a.size !== b.size) {
    return false;
  }
  for (const value of a) {
    if (!b.has(value)) {
      return false;
    }
  }
  return true;
}

/** Use Notifications Controller Result */
interface UseNotificationsControllerResult {
  toastNotification: Notification | null;
  hideToast: () => void;
  showNewIndicator: boolean;
  unreadCount: number;
  readCount: number;
  readFilter: ReadFilter;
  onReadFilterChange: (value: ReadFilter) => void;
  filter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  clearSearch: () => void;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
  visibleNotifications: Notification[];
  isFiltering: boolean;
  totalCount: number;
  filteredCount: number;
  visibleCountActual: number;
  loadMoreRef: RefObject<HTMLDivElement | null>;
  hasMore: boolean;
  dataUpdatedAt: number;
  interactionsValue: NotificationInteractionsContextValue;
  settings: NotificationSettings;
}

/** Use Notifications Controller */
export function useNotificationsController(): UseNotificationsControllerResult {
  const [filter, setFilter] = useState<NotificationFilter>("all");
  const [readFilter, setReadFilter] = useState<ReadFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [readIds, setReadIds] = useState<Set<number>>(() => {
    if (typeof window === "undefined") {
      return new Set();
    }
    try {
      const stored = window.localStorage.getItem(READ_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as number[];
        if (Array.isArray(parsed)) {
          return new Set(parsed);
        }
      }
    } catch (error) {
      console.warn("Failed to read stored read notifications", error);
    }
    return new Set();
  });
  const [previousCount, setPreviousCount] = useState<number>(0);
  const [showNewIndicator, setShowNewIndicator] = useState(false);
  const [toastNotification, setToastNotification] =
    useState<Notification | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { settings } = useNotificationSettings();
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncReadIds = () => {
      const stored = parseStoredReadIds(
        window.localStorage.getItem(READ_STORAGE_KEY)
      );
      setReadIds((prev) => {
        const next = new Set(stored);
        return areSetsEqual(prev, next) ? prev : next;
      });
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === READ_STORAGE_KEY) {
        syncReadIds();
      }
    };

    window.addEventListener(READ_IDS_UPDATED_EVENT, syncReadIds);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(READ_IDS_UPDATED_EVENT, syncReadIds);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const refetchInterval = DEFAULT_REFETCH_INTERVAL;

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        void audioContextRef.current.close();
        audioContextRef.current = null;
      }
    };
  }, []);

  const playNotificationSound = useCallback(async () => {
    if (!settings.soundEnabled || typeof window === "undefined") {
      return;
    }
    const AudioContextClass: typeof AudioContext | undefined =
      window.AudioContext ?? (window as typeof window & {
        webkitAudioContext?: typeof AudioContext;
      }).webkitAudioContext;
    if (!AudioContextClass) {
      return;
    }
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new AudioContextClass();
    }
    const context = audioContextRef.current;
    if (context.state === "suspended") {
      try {
        await context.resume();
      } catch (error) {
        console.warn("Failed to resume audio context", error);
        return;
      }
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "triangle";
    oscillator.frequency.setValueAtTime(880, context.currentTime);

    gain.gain.setValueAtTime(0.0001, context.currentTime);
    oscillator.connect(gain);
    gain.connect(context.destination);

    gain.gain.linearRampToValueAtTime(0.08, context.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.5);

    oscillator.start(context.currentTime);
    oscillator.stop(context.currentTime + 0.5);
    oscillator.onended = () => {
      oscillator.disconnect();
      gain.disconnect();
    };
  }, [settings.soundEnabled]);

  const hideToast = useCallback(() => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
      toastTimeoutRef.current = null;
    }
    setToastNotification(null);
  }, []);

  const showToast = useCallback(
    (notification: Notification) => {
      if (!settings.alertsEnabled || settings.sleepMode) {
        return;
      }
      hideToast();
      setToastNotification(notification);
      void playNotificationSound();

      toastTimeoutRef.current = setTimeout(() => {
        setToastNotification(null);
        toastTimeoutRef.current = null;
      }, 4000);
    },
    [hideToast, settings.alertsEnabled, settings.sleepMode, playNotificationSound]
  );

  useEffect(() => () => hideToast(), [hideToast]);

  const applyReadStateToNotifications = useCallback(
    (notifications: Notification[]) => {
      let didChange = false;
      const next = notifications.map((notification) => {
        const shouldBeRead = readIds.has(notification.id);
        if (notification.isRead === shouldBeRead) {
          return notification;
        }
        didChange = true;
        return { ...notification, isRead: shouldBeRead };
      });
      return didChange ? next : notifications;
    },
    [readIds]
  );

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
    refetchInterval,
    select: applyReadStateToNotifications,
  });

  useEffect(() => {
    queryClient.setQueryData<Notification[]>(["notifications"], (current) => {
      if (!current) {
        return current;
      }
      const reconciled = applyReadStateToNotifications(current);
      return reconciled;
    });
  }, [queryClient, applyReadStateToNotifications]);

  const handleMarkAsRead = useCallback((id: number) => {
    setReadIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
      });
  }, []);

  const handleActivation = useCallback(
    (notification: Notification) => {
      if (!notification.isRead) {
        handleMarkAsRead(notification.id);
      }
    },
    [handleMarkAsRead]
  );

  useEffect(() => {
    const socket = getMockNotificationSocket();
    socket.start();

    const unsubscribe = socket.subscribe((incomingNotification) => {
      queryClient.setQueryData<Notification[]>(["notifications"], (current) => {
        const existing = current ?? [];
        const alreadyExists = existing.some(
          (notification) => notification.id === incomingNotification.id
        );

        if (alreadyExists) {
          return existing;
        }

        const next = applyReadStateToNotifications([
          incomingNotification,
          ...existing,
        ]);

        return next.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      showToast(incomingNotification);
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient, showToast, applyReadStateToNotifications]);

  useEffect(() => {
    const totalNotifications = notifications.length;

    if (totalNotifications > 0) {
      if (previousCount > 0 && totalNotifications > previousCount) {
        setShowNewIndicator(true);
        const newestNotification = notifications[0];
        if (newestNotification) {
          showToast(newestNotification);
        }
        const timer = setTimeout(() => {
          setShowNewIndicator(false);
        }, 5000);
        return () => clearTimeout(timer);
      }
      setPreviousCount(totalNotifications);
    }
  }, [notifications, previousCount, showToast]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filter, readFilter, searchQuery, notifications]);

  const notificationsWithReadState = useMemo(() => {
    return notifications.map((notification) => ({
      ...notification,
      isRead: readIds.has(notification.id),
    }));
  }, [notifications, readIds]);

  const filteredNotifications = useMemo(() => {
    const byType =
      filter === "all"
        ? notificationsWithReadState
        : notificationsWithReadState.filter(
            (notification) => notification.type === filter
          );

    const byRead =
      readFilter === "all"
        ? byType
        : byType.filter((notification) =>
            readFilter === "read" ? notification.isRead : !notification.isRead
          );

    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return byRead;
    }

    const fuse = new Fuse(byRead, {
      keys: ["title", "message"],
      threshold: 0.35,
      includeScore: true,
      ignoreLocation: true,
      minMatchCharLength: trimmedQuery.length > 1 ? 2 : 1,
    });

    return fuse.search(trimmedQuery).map((result) => result.item);
  }, [notificationsWithReadState, filter, readFilter, searchQuery]);

  const unreadCount = useMemo(() => {
    return notificationsWithReadState.filter((n) => !n.isRead).length;
  }, [notificationsWithReadState]);

  const totalCount = notificationsWithReadState.length;
  const filteredCount = filteredNotifications.length;
  const readCount = totalCount - unreadCount;

  const visibleNotifications = useMemo(() => {
    return filteredNotifications.slice(0, visibleCount);
  }, [filteredNotifications, visibleCount]);

  const visibleCountActual = visibleNotifications.length;
  const hasMore = visibleCount < filteredCount;
  const isFiltering =
    filter !== "all" || searchQuery.trim().length > 0 || readFilter !== "all";

  const handleLoadMore = useCallback(() => {
    if (!hasMore) {
      return;
    }
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredCount));
  }, [hasMore, filteredCount]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleLoadMore();
          }
        });
      },
      {
        root: null,
        rootMargin: "320px 0px 320px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, handleLoadMore]);

  const handleFilterChange = useCallback((newFilter: NotificationFilter) => {
    setFilter(newFilter);
  }, []);

  const handleReadFilterChange = useCallback((value: ReadFilter) => {
    setReadFilter(value);
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const payload = JSON.stringify(Array.from(readIds));
      window.localStorage.setItem(READ_STORAGE_KEY, payload);
    } catch (error) {
      console.warn("Failed to persist read notifications", error);
    }
  }, [readIds]);

  useEffect(() => {
    if (visibleNotifications.length === 0) {
      setFocusedIndex(null);
      return;
    }
    setFocusedIndex((prev) => {
      if (prev == null) {
        return 0;
      }
      return Math.min(prev, visibleNotifications.length - 1);
    });
  }, [visibleNotifications.length]);

  const interactionsValue = useMemo<NotificationInteractionsContextValue>(
    () => ({
      markAsRead: handleMarkAsRead,
      focusIndex: focusedIndex,
      setFocusIndex: setFocusedIndex,
      activateNotification: handleActivation,
    }),
    [handleMarkAsRead, focusedIndex, setFocusedIndex, handleActivation]
  );

  const refetchQuery = useCallback(() => {
    void refetch();
  }, [refetch]);

  return {
    toastNotification,
    hideToast,
    showNewIndicator,
    unreadCount,
    readCount,
    readFilter,
    onReadFilterChange: handleReadFilterChange,
    filter,
    onFilterChange: handleFilterChange,
    searchQuery,
    onSearchChange: handleSearchChange,
    clearSearch,
    isLoading,
    isError,
    error,
    refetch: refetchQuery,
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
  };
}

