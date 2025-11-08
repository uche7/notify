import type { ErrorMessageProps } from "@/lib/types/notification-props";

/**
 * Error Message
 * @param {ErrorMessageProps} props - The props for the ErrorMessage component
 * @param {string} props.message - The message to display in the error message
 * @param {() => void} props.onRetry - The function to call when the user clicks the retry button
 * @returns {JSX.Element} Error Message
 */
export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-rose-500/20 dark:text-rose-200">
          <svg
            className="h-8 w-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">
          Something went wrong
        </h3>
        <p className="mb-6 max-w-md text-gray-600 dark:text-slate-400">
          {message || "Failed to load notifications. Please try again."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}
