"use client";

import { useBookmarkStore } from "@repo/store";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotePage() {
  const { id }: { id: string } = useParams();
  const { fetchNotes, notes } = useBookmarkStore();
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.push("/dashboard/not-found");
      return;
    }
    const note = fetchNotes(id);
    if (!note) {
      router.push("/dashboard/not-found");
    }
  }, [id, fetchNotes, router]);
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow bg-white border-[0.1px] border-gray-300 dark:border-white/20 dark:bg-[#2A2A2A]">
      <div className="flex items-center gap-2 mb-5">
        <NotebookPen className="size-5 text-gray-500 dark:text-gray-400" />
        <h1 className="text-2xl font-bold">Note Details</h1>
      </div>
      {notes ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {notes.title || "Untitled"}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-justify">
            {notes.notes}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2">
            {notes.tags && notes.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {notes.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-200 dark:text-blue-800"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
            <Link href={`/dashboard`}>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer">
                Got to Dashboard
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading note...</p>
      )}
    </div>
  );
}
