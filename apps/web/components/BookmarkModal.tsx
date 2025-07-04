import { Loader2 } from "lucide-react";
import { useUiStore, useBookmarkStore, useFolderStore } from "@repo/store";
import { MouseEventHandler, useState } from "react";
import { toast } from "sonner";
import type { CreateBookmarkPayload } from "@repo/types";

export function BookmarkModal({ parentFolder }: { parentFolder?: string }) {
  const { setShowBookmarkModal, showBookmarkModal, loading } = useUiStore();
  const { addBookmark } = useBookmarkStore();
  const { folders } = useFolderStore();
  const [type, setType] = useState<"url" | "notes">("url");
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "," || e.key === " ") {
      e.preventDefault();
      const value = tagInput.trim();
      if (value && !tags.includes(value)) {
        setTags([...tags, value]);
      }
      setTagInput("");
    }
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const payload: CreateBookmarkPayload = {
      type,
      title,
      url,
      notes,
      folderId: selectedFolder  ,
      tags,
    };
    if (type === "url" && !url.trim()) {
      toast.error("URL is required.");
      return;
    }
    if (type === "notes" && !notes.trim()) {
      toast.error("Notes are required.");
      return;
    }
    console.log("Submitting bookmark with data:", {
      title,
      url,
      notes,
      selectedFolder,
      tags,
    });

    // toast.promise(
    //   addBookmark({
    //     title: title || undefined,
    //     url: type === "URL" ? url : undefined,
    //     notes: type === "notes" ? notes : undefined,
    //     folderId: selectedFolder || parentFolder || null,
    //     tags: tags.length > 0 ? tags : undefined,
    //   }).then(() => {
    //     if (!loading) {
    //       setShowBookmarkModal(false);
    //       setTitle("");
    //       setUrl("");
    //       setNotes("");
    //       setTags([]);
    //       setTagInput("");
    //       setSelectedFolder(null);
    //       setType("URL");
    //     }
    //   }),
    //   {
    //     loading: "Creating bookmark...",
    //     success: "Bookmark created successfully!",
    //     error: "Failed to create bookmark.",
    //   }
    // );
  };

  return (
    <>
      {showBookmarkModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setShowBookmarkModal(false)}
        >
          <div
            className="bg-white dark:bg-[#202020] border border-gray-300 dark:border-gray-700 rounded-lg p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Create New Bookmark
            </h2>

            <label
              htmlFor="title"
              className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
            >
              Title(optional)
            </label>
            <input
              id="title"
              type="text"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mb-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              placeholder="Enter bookmark title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {type === "url" && (
              <>
                <label
                  htmlFor="url"
                  className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
                >
                  URL
                </label>
                <input
                  id="url"
                  type="url"
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mb-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="www.example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </>
            )}
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Select Folder
            </label>
            <select
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mb-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 appearance-none"
              value={selectedFolder || ""}
              onChange={(e) => setSelectedFolder(e.target.value)}
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
            <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium">
              Type
            </label>
            <div className="flex mb-4 space-x-2">
              <button
                type="button"
                onClick={() => {
                  setType("url");
                  setUrl("");
                  setNotes("");
                }}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  type === "url"
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                }`}
              >
                URL
              </button>
              <button
                type="button"
                onClick={() => {
                  setType("notes");
                  setUrl("");
                  setNotes("");
                }}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                  type === "notes"
                    ? "bg-blue-600 text-white border-blue-700"
                    : "bg-gray-200 text-gray-800 border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                }`}
              >
                Notes
              </button>
            </div>
            <label
              htmlFor="Tags"
              className="block mb-1 text-gray-700 dark:text-gray-300 font-medium"
            >
              Tags (optional)
            </label>
            <input
              id="tags"
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Type a tag and press Enter, comma, or space"
              className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mb-2 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {type === "notes" && (
              <>
                <label
                  htmlFor="notes"
                  className="block mb-2 text-gray-700 dark:text-gray-300 font-medium"
                >
                  Notes
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  placeholder="Enter your notes here..."
                  className="border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full mb-4 bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </>
            )}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="cursor-pointer px-5 py-2 rounded-xl bg-gray-200 text-gray-900 border border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                onClick={() => setShowBookmarkModal(false)}
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
                    Saving Bookmark...
                  </span>
                ) : (
                  "Save Bookmark"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
