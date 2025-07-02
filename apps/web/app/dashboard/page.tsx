"use client";

import { useFolderStore, useUserStore } from "@repo/store";
import { SearchBar } from "../../components/ui/SearchBar";
import { FolderLayout } from "../../components/ui/dashboard/FolderLayout";
import { CreateFolder } from "../../components/ui/dashboard/CreateFolder";
import { RecentBookmarks } from "../../components/ui/dashboard/RecentBookmarks";
import { useEffect } from "react";

export default function Dashboard() {
  const { fetchFolders, folders } = useFolderStore();
  
  useEffect(() => {
    fetchFolders()
  }, []);
  
  return (
    <div className="m-5">
      <div className="max-w-md mx-auto pt-5">
        <SearchBar placeholder="Search your mark" />
      </div>
      <FolderLayout />
      <div className="flex justify-center">
        <CreateFolder onClick={() => console.log("Create Folder clicked")} />
      </div>
      <RecentBookmarks />
    </div>
  );
}
