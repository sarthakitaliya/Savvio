import { Loader2 } from "lucide-react";
import { useFolderStore, useUiStore } from "@repo/store";
import { MouseEventHandler, useState } from "react";
import { IconsButton } from "./IconsButton";
import { ColorsButton } from "./ColorsButton";
import { toast } from "sonner";

export function CreateFolderModal({ parentFolder }: { parentFolder?: string }) {
  const { setShowModel, showModel, loading } = useUiStore();
  const { addFolder } = useFolderStore();
  const [folderName, setFolderName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("Folder");

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.error("Folder name is required.");
      return;
    }
    toast.promise(
      addFolder({
        name: folderName,
        parentId: parentFolder || null,
        color: color || undefined,
        icon: icon || undefined,
      }).then(() => {
        if(!loading) {
          setShowModel(false);
          setFolderName("");
          setColor("");
          setIcon("Folder");
        }
      }),
      {
        loading: "Creating folder...",
        success: "Folder created successfully!",
        error: "Failed to create folder.",
      }
    );
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    console.log("Selected color:", newColor);
  };

  const handleIconChange = (newIcon: string) => {
    setIcon(newIcon);
    console.log("Selected icon:", newIcon);
  };

  return (
    <>
      {showModel && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setShowModel(false)}
        >
          <div
            className="bg-white dark:bg-[#202020] border border-gray-300 dark:border-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Create New Folder
            </h2>

            <label
              htmlFor="folderName"
              className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
            >
              Folder Name
            </label>
            <input
              id="folderName"
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mb-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Folder Name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
              Icon (optional)
            </label>
            <IconsButton onChange={handleIconChange} selectedIcon={icon} />
            <div className="mt-4">
              <label className="block mb-3 text-gray-700 dark:text-gray-300 font-medium">
                Color (optional)
              </label>
              <ColorsButton
                onChange={handleColorChange}
                selectedColor={color}
              />
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="cursor-pointer px-5 py-2 rounded-xl bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowModel(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`cursor-pointer px-5 py-2 rounded-xl bg-blue-600 text-white border border-blue-700 hover:bg-blue-700 dark:bg-blue-500 dark:border-blue-600 dark:hover:bg-blue-600 transition-colors ${loading ? "opacity-50 pointer-events-none" : ""}`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin w-4 h-4" />
                    Creating Folder...
                  </span>
                ) : (
                  "Create Folder"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
