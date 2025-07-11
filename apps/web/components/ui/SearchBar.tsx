import { useSearchStore } from "@repo/store";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";
import { SearchResults } from "../SearchResults";

export function SearchBar({
  placeholder,
  className,
  scope = "dashboard",
  folderId,
}: {
  placeholder: string;
  className?: string;
  scope?: "dashboard" | "folder";
  folderId?: string;
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { fetchSearchResults, isLoading, setLoading, clearSearchResults } =
    useSearchStore();

  useEffect(() => {
    if (!query.trim()) {
      setOpen(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchSearchResults({
        q: query,
        scope,
        folderId: scope === "folder" ? folderId : undefined,
      });
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query, scope, folderId, fetchSearchResults]);

  const clearSearch = () => {
    setQuery("");
    setOpen(false);
    clearSearchResults();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setLoading(true);
  };
  return (
    <div
      className={`relative bg-white dark:bg-[#232323] shadow-sm dark:shadow-md rounded-lg ${className}`}
    >
      <Search className="absolute top-2.5 left-3 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        className="w-full pl-12 pr-4 py-2 rounded-lg border border-gray-300 dark:border-[#444] bg-white dark:bg-[#2A2A2A] text-[#1F1F1F] dark:text-[#FFFFFFCF] placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-300 transition-colors"
        onChange={handleChange}
      />
      {isLoading ? (
        <Loader2 className="absolute top-2.5 right-3 animate-spin text-gray-500 dark:text-gray-400" />
      ) : query && open ? (
        <button
          className="absolute top-2.5 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
          onClick={clearSearch}
        >
          <X className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
        </button>
      ) : null}
      {open && <SearchResults />}
    </div>
  );
}
