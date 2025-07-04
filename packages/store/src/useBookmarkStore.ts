import { create } from "zustand";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark, getRecentBookmarks } from "@repo/api-client";
import { useUiStore } from "./useUiStore";
import type { Bookmark, CreateBookmarkPayload, DeleteBookmarkPayload, UpdateBookmarkPayload } from "@repo/types";

interface BookmarkStore {
  bookmarks: Bookmark[];
  fetchBookmarks: () => Promise<void>;
  getRecentBookmarks: (limit: number) => Promise<void>;
  addBookmark: (bookmarkData: CreateBookmarkPayload) => Promise<void>;
  editBookmark: (bookmarkData: UpdateBookmarkPayload) => Promise<void>;
  removeBookmark: (bookmarkData: DeleteBookmarkPayload) => Promise<void>;
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

  getRecentBookmarks: async (limit = 10) => {
    setLoading(true);
    try {
      const { bookmarks } = await getRecentBookmarks(limit);
      set({ bookmarks });
    } catch (error: any) {
      console.error("Error fetching recent bookmarks:", error);
      setError(error.response?.data?.error || "Failed to fetch recent bookmarks");
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

  removeBookmark: async (bookmarkData) => {
    setLoading(true);
    try {
      await deleteBookmark(bookmarkData);
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkData.id),
      }));
    } catch (error: any) {
      console.error("Error deleting bookmark:", error);
      setError(error.response?.data?.error || "Failed to delete bookmark");
    } finally {
      setLoading(false);
    }
  },
}));