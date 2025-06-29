"use client";
import { useThemeStore } from "@repo/store";
import { Bookmark, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";

export const NavBar = () => {
  const { theme, setTheme } = useTheme();
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
        <button>
          <User />
        </button>
      </div>
    </div>
  );
};
