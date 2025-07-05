import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import type { Bookmark } from "@repo/types";

export function Bookmark({ bookmark }: { bookmark: Bookmark }) {
    
  return (
    <div className="w-full sm:w-64 max-w-xs flex-grow bg-white border-[0.1px] border-gray-300 dark:border-white/20 dark:bg-[#2A2A2A] p-4 rounded-2xl">
      <a href={bookmark.url || undefined} target="_blank" className="block">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={bookmark?.favicon ?? undefined}
            alt="Bookmark favicon"
            className="w-4 h-4 object-contain"
          />
          <h3 className="text-md truncate flex-1">{bookmark.title || "Untitled"}</h3>
          <div className="self-end ml-auto">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {dayjs(bookmark.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <img
          src={bookmark?.previewImage ?? undefined}
          alt="Bookmark screenshot"
          className="w-full h-32 object-cover rounded-md mt-2"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 truncate max-w-full">
          {bookmark.url}
        </p>
        <div>
          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {bookmark.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
