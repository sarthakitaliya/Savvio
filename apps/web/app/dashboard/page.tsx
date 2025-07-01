"use client";

import { useUserStore } from "@repo/store";
import { SearchBar } from "../../components/ui/SearchBar";
import { FolderLayout } from "../../components/ui/dashboard/FolderLayout";
import { CreateFolder } from "../../components/ui/dashboard/CreateFolder";
import { RecentBookmarks } from "../../components/ui/dashboard/RecentBookmarks";

export default function Dashboard() {
  return (
    <div className="m-5">
      <div className="max-w-md mx-auto pt-5">
        <SearchBar placeholder="Search your mark" />
      </div>
      <FolderLayout />
      <div className="flex justify-center">
        <CreateFolder onClick={() => console.log("Create Folder clicked")} />
      </div>
      <RecentBookmarks/>
    </div>
  );
}
