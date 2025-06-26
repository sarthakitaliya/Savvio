import { Bookmark } from "../../public/icons/bookmark";
import { Dark } from "../../public/icons/moon";
import { PersonIcon } from "../../public/icons/person";

export const NavBar = () => {
  return (
    <nav className="w-screen bg-[#202020] text-white flex justify-between items-center h-10 px-10">
      <div className="flex gap-4">
        <Bookmark />
        Mark
      </div>
      <div className="flex gap-4">
        <button><Dark /></button>
        <button><PersonIcon /></button>
      </div>
    </nav>
  );
};

