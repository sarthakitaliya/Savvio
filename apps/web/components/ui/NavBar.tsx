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
    <nav className="w-screen text-white bg-[#202020] flex justify-between items-center h-15 px-10">
      <div className="flex gap-4">
        <Bookmark />
        Mark
      </div>
      <div className="flex gap-4">
        <button onClick={toggleTheme}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </button>
        <button>
          <User />
        </button>
      </div>
    </nav>
  );
};
