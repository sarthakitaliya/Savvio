import { useSearchStore, useUiStore } from "@repo/store";
import { Loader2, Search, X } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { SearchResults } from "./SearchResults";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const { fetchSearchResults, isLoading, clearSearchResults, setLoading } =
    useSearchStore();
  const { error, setError } = useUiStore();

  useEffect(() => {
    if (!query.trim()) {
      setOpen(false);
      return;
    }

    const debounceTimer = setTimeout(() => {
      fetchSearchResults({
        q: query,
        scope: "dashboard",
      });
    }, 300);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [query, fetchSearchResults]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (!e.target.value.trim()) {
      setOpen(false);
      return;
    }
    setLoading(true);
    setOpen(true);
  };
  const clearSearch = () => {
    setQuery("");
    setOpen(false);
    setError(null);
    clearSearchResults();
  };

  return (
    <div className="relative mt-4 shadow-sm dark:shadow-md rounded-lg">
      <Search className="absolute top-3 left-3 text-gray-500 dark:text-gray-400 size-4" />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-9 px-2 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2A2A2A] text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition-colors"
        value={query}
        onChange={handleChange}
      />
      {isLoading ? (
        <Loader2 className="absolute top-3 right-3 animate-spin text-gray-500 dark:text-gray-400 size-4" />
      ) : query && open ? (
        <button
          className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer"
          onClick={clearSearch}
        >
          <X className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-4" />
        </button>
      ) : null}
      {open && !error && <SearchResults />}

    </div>
  );
}
