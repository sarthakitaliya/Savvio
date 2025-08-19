import { Folder, MoreVertical } from "lucide-react";
import { folderIcons } from "../../../lib/ColorsAndIcons";
import { Folder as FolderType } from "@repo/types";
import { useEffect, useRef } from "react";
import { useFolderStore, useUiStore } from "@repo/store";
import { toast } from "sonner";

export function FolderCard({
  folder,
  onClick,
  menuOpenId,
  setMenuOpenId,
}: {
  folder: FolderType;
  onClick: () => void;
  menuOpenId: string | null;
  setMenuOpenId: (id: string | null) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const selectedIconObj = folderIcons.find((f) => f.name === folder.icon);
  const IconComponent = selectedIconObj ? selectedIconObj.icon : Folder;
  const hasColor = Boolean(folder.color);
  const { deleteFolder, setEditingFolder } = useFolderStore();
  const { setShowFolderModal } = useUiStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.querySelector(".custom-folder-dropdown");
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target as Node) &&
        dropdown &&
        !dropdown.contains(event.target as Node)
      ) {
        console.log("Clicked outside the card and dropdown, closing menu");
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setMenuOpenId]);

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingFolder(folder);
    setMenuOpenId(null);
    setShowFolderModal(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.promise(deleteFolder({ id: folder.id }), {
      loading: "Deleting folder...",
      success: "Folder deleted successfully",
      error: (error) => {
        return error.message || "Failed to delete folder";
      },
    });
  };

  return (
    <div
      ref={cardRef}
      className={`group sm:size-40 size-36 flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-colors relative ${
        !hasColor
          ? "bg-[#E5E7EB] dark:bg-[#2A2A2A] hover:bg-[#D1D5DB] dark:hover:bg-[#3A3A3A]"
          : "hover:brightness-90"
      }`}
      style={{
        backgroundColor: hasColor && folder.color ? folder.color : undefined,
      }}
      onClick={() => {
        console.log("Folder clicked");
        onClick();
      }}
    >
      <div className="flex items-center justify-between relative">
        <div className="text-3xl">
          <IconComponent className="sm:size-8" />
        </div>
        <MoreVertical
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpenId(menuOpenId === folder.id ? null : folder.id);
          }}
        />
        {menuOpenId === folder.id && (
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="custom-folder-dropdown absolute -right-2 top-8 mt-1 w-38 md:w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 divide-y divide-gray-200 dark:divide-gray-700"
          >
            <p
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded-md"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
      </div>
      <div>
        <p className="sm:text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF]">
          {folder.name}
        </p>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {folder._count?.bookmarks}{" "}
          {folder._count?.bookmarks === 1 ? "bookmark" : "bookmarks"}
        </p>
      </div>
    </div>
  );
}
