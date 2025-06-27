import { useThemeStore } from "@repo/store";
import { Bookmark } from "../../public/icons/bookmark";
import { Dark } from "../../public/icons/moon";
import { PersonIcon } from "../../public/icons/person";
import { useTheme } from "next-themes";


export const NavBar = () => {

const { themes, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === 'dark' ? 'light' : 'dark'
    );
    console.log('themes', themes);
    
  };

  return (
    <nav className="w-screen text-white bg-[#202020] flex justify-between items-center h-15 px-10">
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

