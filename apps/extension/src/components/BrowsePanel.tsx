import { useBookmarkStore, useUiStore } from "@repo/store";
import { ArrowRight, NotebookPen } from "lucide-react";
import { useEffect } from "react";
import Loading from "./Loading";

export function BrowsePanel() {
  const { recentBookmarks, getRecentBookmarks } = useBookmarkStore();
  const {loading} = useUiStore();
  const limit = 7;
  const apiUrl = import.meta.env.VITE_WEB_APP_URL;

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
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-4 px-4 mb-5">
      <h1 className="text-lg font-semibold mb-4">Recent Bookmarks</h1>
      {
        recentBookmarks && recentBookmarks.length === 0 && (
          <p className="text-gray-500 text-center">No recent bookmarks found.</p>
        )
      }
      {recentBookmarks && recentBookmarks.length > 0 && (
        <ul className="space-y-3">
          {recentBookmarks.map((bookmark) => {
            const isNote = bookmark.type === "notes";

            const content = (
              <div className="flex justify-between items-center p-3 bg-white dark:bg-[#2A2A2A] rounded-md border border-[#E5E7EB] dark:border-[#333333] hover:bg-[#F3F4F6] dark:hover:bg-[#3A3A3A] transition-colors cursor-pointer">
                <div className="flex items-center space-x-2">
                  {isNote ? (
                    <NotebookPen className="w-4 h-4 text-[#4B5563] dark:text-[#A1A1AA]" />
                  ) : (
                    <img
                      src={
                        bookmark?.favicon
                          ? bookmark.favicon
                          : "/default-favicon.png"
                      }
                      alt="Bookmark favicon"
                      className="w-4 h-4"
                    />
                  )}
                  <span className="text-sm text-[#1F1F1F] dark:text-[#FFFFFFCF] truncate max-w-[120px]">
                    {bookmark.title}
                  </span>
                </div>
                {isNote ? (
                  <span className="text-xs text-[#4B5563] dark:text-[#A1A1AA]">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-xs text-[#4B5563] dark:text-[#A1A1AA] truncate max-w-[80px]">
                    {bookmark.url}
                  </span>
                )}
              </div>
            );

            return (
              <li key={bookmark.id}>
                {isNote ? (
                  <a
                    href={`${apiUrl}/dashboard/note/${bookmark.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                ) : (
                  <a
                    href={bookmark?.url ?? undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {content}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
