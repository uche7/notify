# Notify

A responsive notification center built with Next.js 15, React 19, Tailwind CSS, and TanStack Query. It demonstrates live toast updates, client-side preferences, and mobile-friendly layouts across the home, notifications, and settings pages.

---

## Table of contents

- [Setup](#setup)
- [Project overview](#project-overview)
- [Architecture highlights](#architecture-highlights)
- [Responsive design](#responsive-design)
- [Assumptions](#assumptions)
- [Known limitations & future work](#known-limitations--future-work)
- [Brief notes](#brief-notes)
  - [Challenges faced](#challenges-faced)
  - [Further improvements](#further-improvements)

---

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run the dev server**
   ```bash
   npm run dev
   ```
   The app runs at `http://localhost:3000`.
3. *(Optional)* **Lint**
   ```bash
   npm run lint
   ```

---

## Project overview

- **Next.js App Router** with client components for the interactive areas.
- **React 19** features (`use client` boundaries, hooks) for responsive UI.
- **TanStack Query** manages notifications data and polling intervals.
- **Tailwind CSS** for layout, spacing, and adaptive styling.
- **Lucide React** icons for consistent iconography.
- **Local persistence**: notification preferences (alerts, sleep mode, sound) stored in `localStorage`.

### Pages
- `/` — Hero landing page with live preview and quick links.
- `/notifications` — Filterable list with infinite scrolling, keyboard support, and toasts.
- `/notifications/settings` — Preferences page for alerts, sleep mode, sounds, and quick actions.

---

## Architecture highlights

- **Shared hooks**
  - `useNotificationsController` drives notification state, filters, toasts, and mark-read logic.
  - `useNotificationSettings` + `useNotificationSettingsForm` wrap local persistence and expose update methods.
- **Reusable components**
  - `NotificationSettingsToggleRow` and `NotificationSettingsActionButton` encapsulate repeated patterns.
  - `NotificationToastHub` renders toasts on any page consuming the shared controller.
- **Toast handling**
  - Toasts appear on home, notifications, and settings, respecting sleep mode, sounds, and alert toggles.
  - Web Audio API is used to play a short chime when sounds are enabled.
- **Responsive UI**
  - Toolbar chips wrap gracefully on smaller breakpoints.
  - Notification cards shift to vertical stacks on narrow viewports without losing context.
  - Touch targets meet ≥44px guidance and include focus-visible styling.

---

## Responsive design

Tested breakpoints:
- **Mobile (≈375px)**: stacked layouts, wrap-friendly toolbars, cards adapt vertically.
- **Tablet (≈768px)**: filters and controls distribute horizontally while maintaining readable spacing.
- **Desktop (≥1024px)**: multi-column grids, hero preview card, and wider toast area.

Key techniques:
- Tailwind responsive utilities (`sm:`, `md:`, `lg:`) to adjust flex direction, spacing, and typography.
- Min-height classes on buttons to satisfy touch and accessibility guidelines.
- Conditional wrappers to preserve readability (e.g., toolbars and preview cards).

---

## Assumptions

- Local storage persistence is acceptable for this demonstration.
- JSONPlaceholder data is treated as read-only; mark-as-read happens locally.
- Polling (30s) is sufficient for “real-time” behaviour in this context.
- Dark mode toggle is managed via `next-themes` and Tailwind’s dark variants.

---

## Known limitations & future work

1. **Persistence**: Settings are browser-local; a real app would sync to a backend per user.
2. **Data source**: Notifications use a mock API; real updates would require actual endpoints or WebSockets.
3. **Testing**: No automated tests yet (unit or E2E). Hooks and components would benefit from coverage.
4. **Accessibility**: Baseline support exists, but additional ARIA roles, `aria-live` regions, and SR-only labels should be audited.
5. **Performance**: Virtualization or pagination could be added for larger data sets.
6. **Animations**: Toasts and cards have basic transitions; Framer Motion integration could enhance motion.
7. **Bulk actions**: Only a single “mark all” quick action exists; multi-select or more granular bulk tools are future goals.

---

## Brief notes

### Challenges faced
- Sharing the notifications controller between pages while avoiding server/client mismatches required isolating toast UI in client components.

### Further improvements
- Introduce authenticated user flows with personalized notification feeds.
- Expand settings to include per-channel or schedule-based preferences.
