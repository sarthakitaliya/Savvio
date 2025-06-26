import { useThemeStore } from "@repo/store";
import { Bookmark } from "../../public/icons/bookmark";
import { Dark } from "../../public/icons/moon";
import { PersonIcon } from "../../public/icons/person";
import { useTheme } from "next-themes";


export const NavBar = () => {
  // const { theme, setTheme } = useThemeStore();
  // const toggleTheme = () => {
  //   const newTheme = theme === 'dark' ? 'light' : 'dark';
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle('dark', newTheme === 'dark');
  // };
const { themes, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'dark' ? 'light' : 'dark'
    );
  };
  return (
    <nav className="w-screen bg-white text-black dark:bg-[#202020] dark:text-white flex justify-between items-center h-15 px-10">
      <div className="flex gap-4">
        <Bookmark />
        Mark
      </div>
      <div className="flex gap-4">
        <button onClick={toggleTheme}><Dark /></button>
        <button><PersonIcon /></button>
      </div>
    </nav>
  );
};

