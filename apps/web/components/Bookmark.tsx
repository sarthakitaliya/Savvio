import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import type { Bookmark } from "@repo/types";
import { ArrowRight, NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";

export function Bookmark({ bookmark }: { bookmark: Bookmark }) {
  const router = useRouter();

  if (bookmark.type === "url") {
    return (
      <div className="w-full sm:w-64 max-w-xs flex-grow bg-white border-[0.1px] border-gray-300 dark:border-white/20 dark:bg-[#2A2A2A] p-4 rounded-2xl">
        <a href={bookmark.url || undefined} target="_blank" rel="noopener noreferrer" className="block">
          <div className="flex items-center gap-2 mb-2">
            <img
              src={
                bookmark?.favicon ? bookmark.favicon : "/default-favicon.png"
              }
              alt="Bookmark favicon"
              className="w-4 h-4 object-contain"
            />
            <h3 className="text-md truncate flex-1">
              {bookmark.title || "Untitled"}
            </h3>
            <div className="self-end ml-auto">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {dayjs(bookmark.createdAt).fromNow()}
              </span>
            </div>
          </div>
          <img
            src={
              bookmark?.previewImage
                ? bookmark.previewImage
                : "/default-preview.png"
            }
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
  } else {
    return (
      <div className="w-full h-62 sm:w-64 max-w-xs flex-grow bg-white border-[0.1px] border-gray-300 dark:border-white/20 dark:bg-[#2A2A2A] p-4 rounded-2xl flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <NotebookPen className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <h3 className="text-md truncate flex-1">
            {bookmark.title || "Untitled"}
          </h3>
          <div className="self-end ml-auto">
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {dayjs(bookmark.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <p className="text-sm text-justify text-gray-500 dark:text-gray-400 mt-2 line-clamp-5 max-w-full overflow-hidden">
          {bookmark.notes}
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
        <button
          className="text-sm flex justify-center items-center mt-auto px-4 py-2 text-white cursor-pointer hover:underline"
          onClick={() => {
            router.push(`/dashboard/note/${bookmark.id}`);
          }}
        >
          View Note <ArrowRight className="size-5" />
        </button>
      </div>
    );
  }
}
