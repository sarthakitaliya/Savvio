export function BookmarkSkeleton() {
  return (
    <div className="w-full sm:w-64 max-w-xs flex-grow bg-white dark:bg-[#2A2A2A] border border-gray-200 dark:border-white/20 p-4 rounded-2xl animate-pulse space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="flex-1 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
        <div className="w-12 h-3 bg-gray-200 dark:bg-gray-700 rounded ml-auto" />
      </div>

      <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded-md" />

      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-4/6" />

      <div className="flex gap-1 mt-2">
        {[...Array(2)].map((_, idx) => (
          <div
            key={idx}
            className="h-5 w-12 bg-blue-200 dark:bg-blue-300 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}