"use client";

import { useFolderStore} from "@repo/store";
import { SearchBar } from "../../components/ui/SearchBar";
import { FolderLayout } from "../../components/ui/dashboard/FolderLayout";
import { RecentBookmarks } from "../../components/ui/dashboard/RecentBookmarks";
import { useEffect } from "react";
import { FolderModal } from "../../components/FolderModal";
import { CreateFolderButton } from "../../components/ui/dashboard/CreateFolderButton";
import { BookmarkModal } from "../../components/BookmarkModal";
import { AddBookmarkButton } from "../../components/AddBookmarkButton";


export default function Dashboard() {
  const { fetchFolders, folders } = useFolderStore();

  useEffect(() => {
    fetchFolders()
  }, [fetchFolders]);
  
  return (
    <div className="m-5">
      <AddBookmarkButton/>
      <FolderModal/>
      <BookmarkModal folders={folders} />
      <div className="max-w-md mx-auto pt-5">
        <SearchBar placeholder="Search your bookmarks" className="mt-10" />
      </div>
      <FolderLayout />
      <div className="flex justify-center">
        <CreateFolderButton className="sm:size-40 size-36" />
      </div>
      <RecentBookmarks />
    </div>
  );
}
