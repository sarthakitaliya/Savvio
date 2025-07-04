"use client";

import { useUiStore } from "@repo/store";
import { Plus } from "lucide-react";

export function AddBookmarkButton() {
    const { setShowBookmarkModal } = useUiStore();
  return (
    <button
      onClick={() => setShowBookmarkModal(true)}
      title="Add Bookmark"
      className="cursor-pointer fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center justify-center text-white shadow-lg"
    >
      <Plus size={24} />
    </button>
  );
}
