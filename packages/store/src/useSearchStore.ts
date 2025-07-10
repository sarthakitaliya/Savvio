import { create } from "zustand";
import type { SearchResult, SearchPayload } from "@repo/types";
import { searchBookmarks } from "@repo/api-client";

interface SearchStore {
  searchResults: SearchResult[];
  isLoading: boolean;
  error: string | null;
  fetchSearchResults: (payload: SearchPayload) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearSearchResults: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  isLoading: false,
  error: null,
  fetchSearchResults: async (payload) => {
    try {
      const results = await searchBookmarks(payload);
      set({ searchResults: results });
    } catch (error: any) {
      set({ error: error.message || "Failed to fetch search results" });
    } finally {
      set({ isLoading: false });
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  clearSearchResults: () => set({ searchResults: [], error: null }),
}));
