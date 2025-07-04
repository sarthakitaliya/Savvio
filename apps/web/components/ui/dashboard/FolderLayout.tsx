import { useFolderStore } from "@repo/store";
import { FolderCard } from "./FolderCard";
import { FolderPlus } from "lucide-react";

export function FolderLayout() {
  const { folders } = useFolderStore();

  return (
    <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-7 mt-20 mb-10 md:mx-5">
      {folders.length < 1 ? (
        <div className="text-center">
          <div className="mb-6">
            <FolderPlus className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF] mb-2">
            No folders yet
          </h3>
          <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA] mb-6 max-w-sm">
            Create your first folder to organize your bookmarks and keep everything tidy
          </p>
        </div>
      ) : 
        folders.map((folder) => (
          <FolderCard
            folder={folder}
            key={folder.id}
            onClick={() => console.log(`Clicked on ${folder.name}`)}
          />
        ))
      }
    </div>
  );
}