export function RecentBookmarks() {
  return (
    <div className="mt-8 max-w-xl mx-auto px-4">
      <h2 className="text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF] mb-4">
        Recent Bookmarks
      </h2>
      <ul className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <li
            key={i}
            className="flex justify-between items-center p-3 bg-white dark:bg-[#2A2A2A] rounded-md border border-[#E5E7EB] dark:border-[#333333] hover:bg-[#F3F4F6] dark:hover:bg-[#3A3A3A] transition-colors cursor-pointer"
          >
            <div className="flex items-center space-x-2">
              <img src="/favicon.ico" alt="" className="w-4 h-4" />
              <span className="text-sm text-[#1F1F1F] dark:text-[#FFFFFFCF]">
                Bookmark Title {i + 1}
              </span>
            </div>
            <span className="text-xs text-[#4B5563] dark:text-[#A1A1AA]">
              www.example.com
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}