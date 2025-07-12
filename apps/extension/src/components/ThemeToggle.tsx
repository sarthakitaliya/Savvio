"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className="cursor-pointer flex items-center justify-center w-7 h-7 rounded-full text-[#37352f] dark:text-[#ffffffcf] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
      title="Toggle theme"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
