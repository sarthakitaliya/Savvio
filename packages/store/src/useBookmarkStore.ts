import { create } from "zustand";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark } from "@repo/api-client";
import { useUiStore } from "./useUiStore";

interface Bookmark {
  id: string;
  url: string;
  notes?: string;
  folderId?: string | null;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  fetchBookmarks: () => Promise<void>;
  addBookmark: (bookmarkData: Omit<Bookmark, "id">) => Promise<void>;
  editBookmark: (bookmarkData: Bookmark) => Promise<void>;
  removeBookmark: (id: string) => Promise<void>;
}

const { setLoading, setError } = useUiStore.getState();

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],

  fetchBookmarks: async () => {
    setLoading(true);
    try {
      const { bookmarks } = await getBookmarks();
      set({ bookmarks });
    } catch (error: any) {
      console.error("Error fetching bookmarks:", error);
      setError(error.response?.data?.error || "Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  },

  addBookmark: async (bookmarkData) => {
    setLoading(true);
    try {
      const { bookmark } = await createBookmark(bookmarkData);
      set((state) => ({ bookmarks: [...state.bookmarks, bookmark] }));
    } catch (error: any) {
      console.error("Error creating bookmark:", error);
      setError(error.response?.data?.error || "Failed to create bookmark");
    } finally {
      setLoading(false);
    }
  },

  editBookmark: async (bookmarkData) => {
    setLoading(true);
    try {
      const { bookmark } = await updateBookmark(bookmarkData);
      set((state) => ({
        bookmarks: state.bookmarks.map((b) =>
          b.id === bookmark.id ? bookmark : b
        ),
      }));
    } catch (error: any) {
      console.error("Error updating bookmark:", error);
      setError(error.response?.data?.error || "Failed to update bookmark");
    } finally {
      setLoading(false);
    }
  },

  removeBookmark: async (id) => {
    setLoading(true);
    try {
      await deleteBookmark(id);
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== id),
      }));
    } catch (error: any) {
      console.error("Error deleting bookmark:", error);
      setError(error.response?.data?.error || "Failed to delete bookmark");
    } finally {
      setLoading(false);
    }
  },
}));