import { create } from "zustand";
import type { SearchResult, SearchPayload } from "@repo/types";
import { searchBookmarks } from "@repo/api-client";
import { useUiStore } from "./useUiStore";

interface SearchStore {
  searchResults: SearchResult[];
  isLoading: boolean;
  fetchSearchResults: (payload: SearchPayload) => Promise<void>;
  setLoading: (loading: boolean) => void;
  clearSearchResults: () => void;
}
const { setError } = useUiStore.getState();

export const useSearchStore = create<SearchStore>((set) => ({
  searchResults: [],
  isLoading: false,
  fetchSearchResults: async (payload) => {
    try {
      const results = await searchBookmarks(payload);
      set({ searchResults: results });
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to fetch search results");
      set({ searchResults: [] });
    } finally {
      set({ isLoading: false });
    }
  },
  setLoading: (loading) => set({ isLoading: loading }),
  clearSearchResults: () => set({ searchResults: [], isLoading: false }),
}));
