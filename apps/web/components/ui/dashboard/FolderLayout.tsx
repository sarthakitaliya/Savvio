import { useFolderStore } from "@repo/store";
import { FolderCard } from "./FolderCard";

export function FolderLayout() {
  const { folders } = useFolderStore();

  return (
    <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-7 mt-20 mb-10 md:mx-5">
      {folders.length < 1 ? (
        <div>
          <div className="text-3xl mb-4">📂</div>
          <p className="text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF]">
            No folders yet
          </p>
          <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA]">
            Create a folder to organize your bookmarks
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

