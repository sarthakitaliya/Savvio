import { useBookmarkStore, useUiStore } from "@repo/store";
import { Bookmark } from "./Bookmark";
import { BookmarkSkeleton } from "./BookmarkSkeleton";

export function BookmarkLayout() {
  const { bookmarks } = useBookmarkStore();
  const { loadingBookmarkSkeleton } = useUiStore();

  return (
    <div className="flex items-center justify-center md:justify-normal flex-wrap gap-5 sm:gap-7 mt-20 mb-10 md:mx-5">
      {loadingBookmarkSkeleton ? (
        <div className="flex w-full flex-wrap justify-center gap-5 sm:gap-7">
          {[...Array(4)].map((_, index) => (
            <BookmarkSkeleton key={index} />
          ))}
        </div>
      ) : bookmarks.length < 1 ? (
        <div className="flex flex-col items-center justify-center w-full h-text-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mb-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-semibold mb-2">No bookmarks yet</h2>
          <p className="text-sm">Start saving your favorite sites or notes.</p>
        </div>
      ) : (
        bookmarks.map((bookmark) => (
          <Bookmark bookmark={bookmark} key={bookmark.id} />
        ))
      )}
    </div>
  );
}
