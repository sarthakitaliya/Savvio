import { useBookmarkStore } from "@repo/store";
import { Bookmark } from "./Bookmark";

export function BookmarkLayout() {
  const { bookmarks } = useBookmarkStore();

  return (
    <div className="flex items-center justify-center md:justify-normal flex-wrap gap-5 sm:gap-7 mt-20 mb-10 md:mx-5">
      {bookmarks.length < 1 ? (
        <div>
            <p>No bookmarks found</p>
        </div>
      ) : (
        bookmarks.map((bookmark) => (
          <Bookmark bookmark={bookmark} key={bookmark.id} />
        ))
      )}
    </div>
  );
}
