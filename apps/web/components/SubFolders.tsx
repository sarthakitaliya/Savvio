import { useFolderStore } from "@repo/store";
import { FolderPlus } from "lucide-react";
import { FolderCard } from "./ui/dashboard/FolderCard";
import { CreateFolderButton } from "./ui/dashboard/CreateFolderButton";
import { usePathname, useRouter } from "next/navigation";

export function SubFolders() {
  const { subfolders } = useFolderStore();
  const router = useRouter();
  const pathName = usePathname();
  
  const handleFolderClick = (folderName: string) => {
    router.push(`${pathName}/${encodeURIComponent(folderName)}`);
  };

  console.log("Subfolders:", subfolders);
  return (
    <div className="flex items-center flex-wrap gap-5 sm:gap-7 mt-15 mb-10 md:mx-5">
      {subfolders &&
        subfolders?.length >= 1 &&
        subfolders.map((folder) => (
          <FolderCard folder={folder} key={folder.id} onClick={() => handleFolderClick(folder.name)} />
        ))}
        <CreateFolderButton className="size-40" />
    </div>
  );
}
