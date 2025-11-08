/**
 * Loading Spinner
 * @returns {JSX.Element} Loading Spinner
 */
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin dark:border-slate-700 dark:border-t-blue-400" />
      </div>
    </div>
  );
}
