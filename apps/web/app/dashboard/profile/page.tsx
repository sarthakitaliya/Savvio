"use client";
import { useUserStore, useUiStore } from "@repo/store";
import { signOut } from "../../../lib/auth-client";
import { useRouter } from "next/navigation";
import { Bookmark, Folder } from "lucide-react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, logout, getProfileStats, stats } = useUserStore();
  const { setError } = useUiStore();
  const router = useRouter();

  useEffect(() => {
    getProfileStats();
  }, [getProfileStats]);

  const handleLogout = async () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          logout();
          router.push("/");
        },
        onError: (error) => {
          setError("Logout failed. Please try again.");
        },
      },
    });
  };

  return (
    <div className="flex justify-center mt-16 px-4">
      <div className="bg-white dark:bg-[#1F1F1F] border border-[#E5E7EB] dark:border-[#333333] shadow-lg rounded-lg p-8 w-full max-w-md flex flex-col items-center">
        <img
          src={user?.image || "/default-avatar.png"}
          alt={user?.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
        />
        <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
          {user?.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>

        <div className="mt-6 flex flex-wrap justify-center gap-4 w-full">
          <div className="flex flex-col items-center bg-gray-50 dark:bg-[#2A2A2A] rounded-lg p-4 w-40">
            <Folder className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h2 className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Total Folders
            </h2>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {stats?.totalFolders}
            </span>
          </div>
          <div className="flex flex-col items-center bg-gray-50 dark:bg-[#2A2A2A] rounded-lg p-4 w-40">
            <Bookmark className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            <h2 className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Total Bookmarks
            </h2>
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {stats?.totalBookmarks}
            </span>
          </div>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm">
          Joined on{" "}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Unknown"}
          </span>
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-2 rounded bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 text-white font-medium transition-colors cursor-pointer"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
