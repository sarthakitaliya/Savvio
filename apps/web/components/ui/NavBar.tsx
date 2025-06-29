"use client";
import { useThemeStore, useUserStore } from "@repo/store";
import { Bookmark, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";

export const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const { user } = useUserStore();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    console.log("theme", theme);
  };

  return (
    <div className="h-14 flex justify-between items-center bg-[#202020] px-5">
      <div className="flex items-center">
        <Bookmark />
        BookMeMark
      </div>
      <div className="flex items-center gap-4">
        <button onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <div className="flex items-center gap-2 hover:bg-gray-600 rounded-full p-1 cursor-pointer">
          <Image
            src={user?.image || "/default-avatar.png"}
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
