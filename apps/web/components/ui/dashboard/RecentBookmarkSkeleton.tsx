export function RecentBookmarkSkeleton() {
  return (
    <div className="flex justify-between items-center p-3 bg-white dark:bg-[#2A2A2A] rounded-md border border-[#E5E7EB] dark:border-[#333333] animate-pulse">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-48 sm:w-56 md:w-64" />
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 sm:w-32 md:w-40" />
    </div>
  );
}