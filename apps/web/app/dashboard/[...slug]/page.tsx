"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Breadcrumbs } from "../../../components/Breadcrumbs";
import { SearchBar } from "../../../components/ui/SearchBar";
import { FolderModal } from "../../../components/FolderModal";
import { BookmarkModal } from "../../../components/BookmarkModal";
import { useBookmarkStore, useFolderStore } from "@repo/store";
import { SubFolders } from "../../../components/SubFolders";
import { BookmarkLayout } from "../../../components/BookmarkLayout";

export default function FolderPage() {
  const params = useParams();
  const slug = params.slug;
  const slugArray = typeof slug === "string" ? [slug] : slug || [];

  const {
    resolveFolderPath,
    currentFolder,
    fetchSubfolders,
    cleanUp,
    folders,
    subfolders,
  } = useFolderStore();
  const { fetchBookmarks, clearBookmarks } = useBookmarkStore();
  const lastPathRef = useRef<string>("");
  const router = useRouter();

  useEffect(() => {
    const currentPath = slugArray.join("/");

    if (currentPath === lastPathRef.current) {
      // same path, skip resolving again
      return;
    }

    lastPathRef.current = currentPath;
    const resolveAndFetch = async () => {
      cleanUp();
      clearBookmarks();
      if (slugArray.length > 0) {
        const resolvedFolder = await resolveFolderPath(slugArray); 
        if (!resolvedFolder) {
          router.push("/dashboard/not-found");
          return;
        }
      }
    };

    resolveAndFetch();
  }, [slugArray, cleanUp, clearBookmarks, resolveFolderPath]);

  useEffect(() => {
    if (currentFolder?.id) {
      const fetchData = async () => {
        try {
          await Promise.all([
            fetchSubfolders(currentFolder.id),
            fetchBookmarks(currentFolder.id),
          ]);
        } catch (error) {
          console.error("Error fetching folder data:", error);
        }
      };

      fetchData();
    }
  }, [currentFolder?.id, fetchSubfolders, fetchBookmarks]);

  return (
    <div className="m-5">
      <FolderModal
        parentFolder={{
          id: currentFolder?.id ?? "",
          name: currentFolder?.name ?? "",
        }}
      />
      <BookmarkModal
        parentFolder={currentFolder?.id}
        folders={
          currentFolder && subfolders
            ? [...subfolders, currentFolder]
            : [...folders]
        }
      />
      <Breadcrumbs slugs={slugArray} />
      <div className="max-w-md mx-auto pt-5">
        <SearchBar
          placeholder={`Search in ${currentFolder?.name || "folder"}`}
          className="mt-10 mb-15"
        />
      </div>
      <div className="mx-3">
        <h1 className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-5">
          Subfolders
        </h1>
        <SubFolders />
      </div>
      <div className="mx-3">
        <h1 className="border-b border-gray-200 dark:border-gray-700 pb-2 mb-5">
          Bookmarks
        </h1>
        <BookmarkLayout />
      </div>
    </div>
  );
}
