import { useBookmarkStore, useFolderStore } from "@repo/store";
import { FolderCard } from "./ui/dashboard/FolderCard";
import { CreateFolderButton } from "./ui/dashboard/CreateFolderButton";
import { usePathname, useRouter } from "next/navigation";

export function SubFolders() {
  const { subfolders, cleanUp } = useFolderStore();
  const {clearBookmarks } = useBookmarkStore();
  const router = useRouter();
  const pathName = usePathname();
  
  const handleFolderClick = (folderSlug: string) => {
    cleanUp();
    clearBookmarks();
    router.push(`${pathName}/${encodeURIComponent(folderSlug)}`);
  };

  return (
    <div className="flex items-center flex-wrap gap-5 sm:gap-7 mt-15 mb-10 md:mx-5">
      {subfolders &&
        subfolders?.length >= 1 &&
        subfolders.map((folder) => (
          <FolderCard folder={folder} key={folder.id} onClick={() => handleFolderClick(folder.slug)} />
        ))}
        <CreateFolderButton className="sm:size-40 size-36" />
    </div>
  );
}
