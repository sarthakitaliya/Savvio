export function FolderSkeleton() {
  return (
    <div className="w-full max-w-[150px] sm:max-w-[180px] md:max-w-[200px] h-32 rounded-xl p-4 bg-gray-200 dark:bg-gray-800 animate-pulse flex flex-col justify-between">
      <div className="h-6 w-3/4 rounded bg-gray-300 dark:bg-gray-700" />
      <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-700" />
    </div>
  );
}