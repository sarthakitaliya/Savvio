"use client";

import { useFolderStore, useUiStore, useUserStore } from "@repo/store";
import { SearchBar } from "../../components/ui/SearchBar";
import { FolderLayout } from "../../components/ui/dashboard/FolderLayout";
import { RecentBookmarks } from "../../components/ui/dashboard/RecentBookmarks";
import { useEffect } from "react";
import { CreateFolderModal } from "../../components/CreateFolderModal";
import { CreateFolderButton } from "../../components/ui/dashboard/CreateFolderButton";


export default function Dashboard() {
  const { fetchFolders, folders } = useFolderStore();
  const {setShowModel, showModel} = useUiStore();

  useEffect(() => {
    fetchFolders()
  }, []);
  
  return (
    <div className="m-5">
      <CreateFolderModal />
      <div className="max-w-md mx-auto pt-5">
        <SearchBar placeholder="Search your mark" />
      </div>
      <FolderLayout />
      <div className="flex justify-center">
        <CreateFolderButton />
      </div>
      <RecentBookmarks />
    </div>
  );
}
