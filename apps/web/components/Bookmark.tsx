import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import type { Bookmark } from "@repo/types";
import { ArrowRight, NotebookPen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useBookmarkStore } from "@repo/store";
import { toast } from "sonner";

export function Bookmark({ bookmark }: { bookmark: Bookmark }) {
  const router = useRouter();
  const { deleteBookmark } = useBookmarkStore();

  const handleDeleteBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Deleting bookmark:", bookmark.id);

    toast.promise(deleteBookmark({ id: bookmark.id }), {
      success: "Bookmark deleted successfully.",
      loading: "Deleting bookmark...",
      error: (error) => {
        return error.message || "Failed to delete bookmark.";
      },
    });
  };

  if (bookmark.type === "url") {
    return (
      <div className="w-full sm:w-64 max-w-xs flex-grow bg-white border-[0.1px] border-gray-300 dark:border-white/20 dark:bg-[#2A2A2A] p-4 rounded-2xl">
        <a
          href={bookmark.url || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={
                bookmark?.favicon ? bookmark.favicon : "/default-favicon.png"
              }
              width={16}
              height={16}
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
          <Image
            src={
              bookmark?.previewImage
                ? bookmark.previewImage
                : "/default-preview.png"
            }
            width={320}
            height={120}
            alt="Bookmark screenshot"
            className="w-full h-32 object-cover rounded-md mt-2"
          />
        </a>

        <div className="mt-2 flex items-center justify-between">
          <a
            href={bookmark.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:underline"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[190px]">
              {bookmark.url}
            </p>
          </a>
          <div className="text-gray-400 hover:text-red-500 cursor-pointer">
            <Trash size={17} onClick={handleDeleteBookmark} />
          </div>
        </div>
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
    );
  } else {
    return (
      <div className="w-full h-60 sm:w-64 max-w-xs flex-grow bg-white border-[0.1px] border-gray-300 dark:border-white/20 dark:bg-[#2A2A2A] p-4 rounded-2xl flex flex-col">
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
        <div className="flex flex-col flex-grow">
          <p className="text-sm text-justify text-gray-500 dark:text-gray-400 mt-2 line-clamp-5 mb-4">
            {bookmark.notes}
          </p>
          {bookmark.tags && bookmark.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2 mt-auto">
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
          <div className="flex justify-between items-center px-1 mt-auto">
            <button
              className="text-sm flex justify-center items-center gap-2 text-black dark:text-gray-300 cursor-pointer hover:underline"
              onClick={() => {
                router.push(`/dashboard/note/${bookmark.id}`);
              }}
            >
              View Note <ArrowRight className="size-5" />
            </button>
            <div className="text-gray-400 hover:text-red-500 cursor-pointer">
              <Trash size={17} onClick={handleDeleteBookmark} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
