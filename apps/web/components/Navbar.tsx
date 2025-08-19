import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";

export default function NavBar() {
  return (
    <div className="h-10 flex justify-between items-center py-13 px-5 xl:px-28 fixed top-0 left-0 right-0 z-50">
      <div className="border flex items-center border-[#CECEEA] rounded-2xl p-2 cursor-pointer bg-[#F5F5F4] dark:bg-[#202020] dark:border-[#3A3A3C]">
        {/* <Logo /> */}
        <div className="relative size-8 sm:size-10">
          <Image src="/logo.svg" alt="Logo" fill />
        </div>
        <h1 className="font-bold text-md sm:text-xl">Savvio</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4 border border-[#CECEEA] rounded-2xl p-2 sm:p-2 font-medium bg-[#F5F5F4] dark:bg-[#202020] dark:border-[#3A3A3C]">
        <LogIn className="sm:hidden text-gray-500 size-5"/>
        <Link href="/login" className="text-sm hidden sm:block">Login</Link>
        <a href="https://chromewebstore.google.com/detail/savvio/pfgjkdbnpkieiakfigebbhfmeamgknem" className="text-xs bg-black text-white dark:bg-[#F5F5F4] dark:text-black rounded-xl sm:rounded-2xl p-2 sm:p-3" target="_blank">Add to Chrome</a>
      </div>
    </div>
  );
}
