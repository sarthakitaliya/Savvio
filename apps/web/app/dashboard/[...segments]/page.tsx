"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { SearchBar } from "../../../components/ui/SearchBar";
import { FolderModal } from "../../../components/FolderModal";
import { BookmarkModal } from "../../../components/BookmarkModal";
import { useBookmarkStore, useFolderStore } from "@repo/store";

export default function FolderPage() {
  const params = useParams();
  const segmentsParam = params.segments;
  const segmentsArray =
    typeof segmentsParam === "string" ? [segmentsParam] : segmentsParam || [];

  const { resolveFolderPath, currentFolder, fetchSubfolders } =
    useFolderStore();
  const { fetchBookmarks } = useBookmarkStore();

  useEffect(() => {
    if (segmentsArray.length > 0) {
      resolveFolderPath(segmentsArray).then(() => {
        if (currentFolder?.id) {
          fetchSubfolders(currentFolder?.id);
          fetchBookmarks(currentFolder?.id);
        }
      });
    }
  }, [segmentsArray, resolveFolderPath]);

  return (
    <div className="m-5">
      <FolderModal parentFolder={undefined} />
      <BookmarkModal />
      <Breadcrumbs segments={segmentsArray} />
      <div className="max-w-md mx-auto pt-5">
        <SearchBar
          placeholder={`Search in ${currentFolder?.name || "folder"}`}
          className="mt-5"
        />
      </div>
    </div>
  );
}
