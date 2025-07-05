import { useFolderStore } from "@repo/store";
import { FolderPlus } from "lucide-react";
import { FolderCard } from "./ui/dashboard/FolderCard";

export function SubFolders() {
  const { subfolders } = useFolderStore();
    
  return (
    <div className="flex items-center justify-center flex-wrap gap-5 sm:gap-7 mt-15 mb-10 md:mx-5">
      {subfolders && subfolders?.length > 1 ? subfolders.map((folder) => (
        <FolderCard
          folder={folder}
          key={folder.id}
        />
      )) : (
        <p>No subfolders available</p>
      )}
    </div>
  );
}