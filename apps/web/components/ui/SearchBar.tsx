
import { Search } from "lucide-react"

export function SearchBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative bg-white dark:bg-[#232323] shadow-sm dark:shadow-md rounded-lg mt-10">
      <Search className="absolute top-2.5 left-3 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-[#1F1F1F] dark:text-[#FFFFFFCF] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300 transition-colors"
      />
    </div>
  );
}