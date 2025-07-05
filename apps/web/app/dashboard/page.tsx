"use client";

import { useFolderStore, useUiStore, useUserStore } from "@repo/store";
import { SearchBar } from "../../components/ui/SearchBar";
import { FolderLayout } from "../../components/ui/dashboard/FolderLayout";
import { RecentBookmarks } from "../../components/ui/dashboard/RecentBookmarks";
import { useEffect } from "react";
import { FolderModal } from "../../components/FolderModal";
import { CreateFolderButton } from "../../components/ui/dashboard/CreateFolderButton";
import { BookmarkModal } from "../../components/BookmarkModal";


export default function Dashboard() {
  const { fetchFolders, folders } = useFolderStore();

  useEffect(() => {
    fetchFolders()
  }, []);
  
  return (
    <div className="m-5">
      <FolderModal/>
      <BookmarkModal/>
      <div className="max-w-md mx-auto pt-5">
        <SearchBar placeholder="Search your mark" className="mt-10" />
      </div>
      <FolderLayout />
      <div className="flex justify-center">
        <CreateFolderButton />
      </div>
      <RecentBookmarks />
    </div>
  );
}
