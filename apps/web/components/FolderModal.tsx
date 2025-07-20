import { Loader2 } from "lucide-react";
import { useFolderStore, useUiStore } from "@repo/store";
import { MouseEventHandler, useEffect, useState } from "react";
import { IconsButton } from "./IconsButton";
import { ColorsButton } from "./ColorsButton";
import { toast } from "sonner";
import { CreateFolderPayload } from "@repo/types";

export function FolderModal({
  parentFolder,
}: {
  parentFolder?: { id: string; name: string };
}) {
  const { setShowFolderModal, showFolderModal, loading } = useUiStore();
  const { addFolder, editingFolder, updateFolder, clearEditingFolder } =
    useFolderStore();
  const [folderName, setFolderName] = useState("");
  const [color, setColor] = useState("");
  const [icon, setIcon] = useState("Folder");

  useEffect(() => {
    if (editingFolder) {
      setFolderName(editingFolder.name);
      setColor(editingFolder.color || "");
      setIcon(editingFolder.icon || "Folder");
    } else {
      setFolderName("");
      setColor("");
      setIcon("Folder");
    }
  }, [editingFolder, showFolderModal, clearEditingFolder]);

  const resetForm = () => {
    setFolderName("");
    setColor("");
    setIcon("Folder");
    clearEditingFolder();
  };
  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    if (!folderName.trim()) {
      toast.error("Folder name is required.");
      return;
    }
    const payload: CreateFolderPayload = {
      name: folderName,
      parentId: parentFolder?.id || null,
      color: color || undefined,
      icon: icon || undefined,
    };

    const action = editingFolder
      ? updateFolder({ ...payload, id: editingFolder.id })
      : addFolder(payload);
    toast.promise(
      action,
      {
        loading: editingFolder ? "Updating folder..." : "Creating folder...",
        success: () => {
          setShowFolderModal(false);
          resetForm();
          return editingFolder
            ? "Folder updated successfully"
            : "Folder created successfully";
        },
        error: (error) => {
          return error.message || "Failed to process folder";
        },
      }
    );
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleIconChange = (newIcon: string) => {
    setIcon(newIcon);
  };

  return (
    <>
      {showFolderModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => {
            setShowFolderModal(false);
            clearEditingFolder();
          }}
        >
          <div
            className="bg-white dark:bg-[#202020] border border-gray-300 dark:border-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {editingFolder ? "Edit Folder" : "Create Folder"}
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
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e as unknown as React.MouseEvent<HTMLButtonElement>);
              }}
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
                onClick={() => {
                  setShowFolderModal(false);
                  clearEditingFolder();
                }}
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
                    {editingFolder ? "Editing Folder..." : "Creating Folder..."}
                  </span>
                ) : editingFolder ? (
                  "Edit Folder"
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
