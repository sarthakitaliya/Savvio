import { useBookmarkStore, useUiStore } from "@repo/store";
import { useEffect } from "react";

export function RecentBookmarks() {
  const { bookmarks, getRecentBookmarks } = useBookmarkStore();
  const { loading } = useUiStore();
  const limit = 5;

  useEffect(() => {
    const fetchRecentBookmarks = async () => {
      try {
        await getRecentBookmarks(limit);
      } catch (error) {
        console.error("Error fetching recent bookmarks:", error);
      }
    };
    fetchRecentBookmarks();
  }, [getRecentBookmarks, limit]);
  return (
    <div className="mt-8 max-w-xl mx-auto px-4">
      <h2 className="text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF] mb-4">
        Recent Bookmarks
      </h2>
      <ul className="space-y-3">
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <a
              href={bookmark?.url ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center p-3 bg-white dark:bg-[#2A2A2A] rounded-md border border-[#E5E7EB] dark:border-[#333333] hover:bg-[#F3F4F6] dark:hover:bg-[#3A3A3A] transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <img
                  src={bookmark?.favicon ? bookmark.favicon : "/default-favicon.png"}
                  alt="Bookmark favicon"
                  className="w-4 h-4"
                />
                <span className="text-sm text-[#1F1F1F] dark:text-[#FFFFFFCF]">
                  {bookmark.title}
                </span>
              </div>
              <span className="text-xs text-[#4B5563] dark:text-[#A1A1AA] truncate max-w-[150px]">
                {bookmark.url}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
