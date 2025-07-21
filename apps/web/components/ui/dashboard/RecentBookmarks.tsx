import Link from "next/link";
import { ArrowRight, NotebookPen, BookmarkPlus } from "lucide-react";
import { useBookmarkStore, useUiStore } from "@repo/store";
import { useEffect } from "react";
import Image from "next/image";
import { RecentBookmarkSkeleton } from "./RecentBookmarkSkeleton";

export function RecentBookmarks() {
  const { recentBookmarks, getRecentBookmarks } = useBookmarkStore();
  const { setShowBookmarkModal, loadingBookmarkSkeleton } = useUiStore();
  const limit = 5;

  useEffect(() => {
    const fetchRecentBookmarks = async () => {
      try {
        if (recentBookmarks.length === 0) {
          await getRecentBookmarks(limit);
        }
      } catch (error) {
        console.error("Error fetching recent bookmarks:", error);
      }
    };
    fetchRecentBookmarks();
  }, [getRecentBookmarks, limit]);

  const hasBookmarks = recentBookmarks.length > 0;

  return (
    <div className="mt-8 max-w-xl mx-auto px-4">
      <h2 className="text-lg font-semibold mb-4">Recent Bookmarks</h2>
      {loadingBookmarkSkeleton ? (
        <div className="flex flex-col gap-4">
          {[...Array(4)].map((_, idx) => (
            <RecentBookmarkSkeleton key={idx} />
          ))}
        </div>
      ) : hasBookmarks ? (
        <ul className="space-y-3">
          {recentBookmarks.map((bookmark) => {
            const isNote = bookmark.type === "notes";

            const content = (
              <div className="flex justify-between items-center p-3 bg-white dark:bg-[#2A2A2A] rounded-md border border-[#E5E7EB] dark:border-[#333333] hover:bg-[#F3F4F6] dark:hover:bg-[#3A3A3A] transition-colors cursor-pointer">
                <div className="flex items-center space-x-2">
                  {isNote ? (
                    <NotebookPen className="w-4 h-4 text-[#4B5563] dark:text-[#A1A1AA]" />
                  ) : (
                    <Image
                      src={
                        bookmark?.favicon
                          ? bookmark.favicon
                          : "/default-favicon.png"
                      }
                      width={16}
                      height={16}
                      alt="Bookmark favicon"
                      className="w-4 h-4"
                    />
                  )}
                  <span className="text-sm text-[#1F1F1F] dark:text-[#FFFFFFCF] truncate max-w-[200px]">
                    {bookmark.title}
                  </span>
                </div>
                {isNote ? (
                  <span className="text-xs text-[#4B5563] dark:text-[#A1A1AA]">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-xs text-[#4B5563] dark:text-[#A1A1AA] truncate max-w-[150px]">
                    {bookmark.url}
                  </span>
                )}
              </div>
            );

            return isNote ? (
              <li key={bookmark.id}>
                <Link href={`/dashboard/note/${bookmark.id}`}>{content}</Link>
              </li>
            ) : (
              <li key={bookmark.id}>
                <a
                  href={bookmark?.url ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-8">
          <div className="flex justify-center mb-4">
            <BookmarkPlus className="w-12 h-12 text-gray-300 dark:text-gray-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            No recent bookmarks yet.
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 max-w-sm mx-auto">
            Save links or write notes to keep everything in one place.
          </p>
          <div className="flex justify-center gap-2">
            <button
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
              onClick={() => {
                setShowBookmarkModal(true);
              }}
            >
              <BookmarkPlus className="w-4 h-4 mr-2" />
              Add Bookmark
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
