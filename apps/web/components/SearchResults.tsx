import { useSearchStore } from "@repo/store";
import { ArrowRight, Folder, NotebookPen } from "lucide-react";
import { folderIcons } from "./ColorsAndIcons";
import Link from "next/link";
import Image from "next/image";

export function SearchResults() {
  const { searchResults, isLoading } = useSearchStore();

  return (
    <div className="absolute z-10 w-full mt-2 bg-white dark:bg-[#2A2A2A] border border-gray-200 dark:border-[#444] shadow-lg rounded-lg max-h-60 overflow-y-auto">
      {isLoading && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          Loading...
        </div>
      )}
      {!isLoading && searchResults.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400 py-10">
          No results found
        </div>
      )}

      {!isLoading && searchResults.length > 0 && (
        <ul>
          {searchResults.map((item) => {
            let IconComponent = Folder;

            if (item.type === "folder" && item.icon) {
              const matchingIcon = folderIcons.find(
                (f) => f.name === item.icon
              );
              if (matchingIcon) {
                IconComponent = matchingIcon.icon;
              }
            }

            return (
              <li
                key={item.id}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {item.type === "bookmark" ? (
                  <div>
                    {item.bookmarkType === "notes" ? (
                      <Link
                        href={`/dashboard/note/${item.id}`}
                        className="flex gap-5 items-center"
                      >
                        <NotebookPen className="w-4 h-4 text-[#4B5563] dark:text-[#A1A1AA]" />
                        <span className="truncate max-w-[160px] sm:max-w-[280px]">{item.title}</span>
                        <ArrowRight className="w-4 h-4 self-end ml-auto" />
                      </Link>
                    ) : (
                      <a
                        href={`${item.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex gap-5 items-center"
                      >
                        <Image
                          src={item.favicon || "/default-favicon.png"}
                          width={16}
                          height={16}
                          alt="Bookmark favicon"
                          className="w-4 h-4 object-contain"
                        />
                        <span className="truncate max-w-[160px] sm:max-w-[280px]">{item.title}</span>
                        <ArrowRight className="w-4 h-4 self-end ml-auto" />
                      </a>
                    )}
                  </div>
                ) : (
                  <Link
                    href={`/dashboard/${item.slug}`}
                    className="flex items-center gap-5"
                  >
                    <IconComponent className="w-4 h-4 text-[#4B5563] dark:text-[#A1A1AA]" />
                    <p className="truncate max-w-[160px] sm:max-w-[280px]">{item.name}</p>
                    <ArrowRight className="w-4 h-4 self-end ml-auto" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
