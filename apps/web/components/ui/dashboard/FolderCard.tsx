import { Folder } from "lucide-react";
import { folderIcons } from "../../ColorsAndIcons";

export function FolderCard({
  folder,
  onClick,
}: {
  folder: {
    id: string;
    name: string;
    parentId?: string | null;
    icon?: string;
    color?: string;
    _count: {
      bookmarks: number;
    };
    createdAt?: string;
  };
  onClick?: () => void;
}) {
  console.log("Rendering FolderCard for:", folder);
  const selectedIconObj = folderIcons.find((f) => f.name === folder.icon);
  const IconComponent = selectedIconObj ? selectedIconObj.icon : Folder;
  const hasColor = Boolean(folder.color);
  
  return (
    <div
      className={`size-40 flex flex-col justify-between p-4 rounded-xl cursor-pointer transition-colors ${
        !hasColor 
          ? "bg-[#E5E7EB] dark:bg-[#2A2A2A] hover:bg-[#D1D5DB] dark:hover:bg-[#3A3A3A]" 
          : "hover:brightness-90"
      }`}
      style={{ 
        backgroundColor: hasColor ? folder.color : undefined,
      }}
      onClick={onClick}
    >
      <div className="text-3xl">
        <IconComponent className="w-8 h-8" />
      </div>
      <div>
        <p className="text-lg font-semibold text-[#1F1F1F] dark:text-[#FFFFFFCF]">
          {folder.name}
        </p>
        <p className="text-sm text-[#4B5563] dark:text-[#A1A1AA]">
          {folder._count?.bookmarks}{" "}
          {folder._count?.bookmarks === 1 ? "bookmark" : "bookmarks"}
        </p>
      </div>
    </div>
  );
}