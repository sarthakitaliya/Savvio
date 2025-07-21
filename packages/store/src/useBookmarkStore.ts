import { create } from "zustand";
import {
  getBookmarks,
  createBookmark,
  updateBookmark,
  deleteBookmark,
  getRecentBookmarks,
  getNoteById,
} from "@repo/api-client";
import { useUiStore } from "./useUiStore";
import type {
  Bookmark,
  CreateBookmarkPayload,
  DeleteBookmarkPayload,
  recentBookmark,
  UpdateBookmarkPayload,
} from "@repo/types";
import { useFolderStore } from "./useFolderStore";

interface BookmarkStore {
  bookmarks: Bookmark[];
  notes: Bookmark | null;
  recentBookmarks: recentBookmark[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  fetchBookmarks: (folderId: string) => Promise<void>;
  fetchNotes: (id: string) => Promise<Bookmark | undefined>;
  clearBookmarks: () => void;
  getRecentBookmarks: (limit: number) => Promise<void>;
  setRecentBookmarks: (bookmarks: recentBookmark[]) => void;
  addBookmark: (bookmarkData: CreateBookmarkPayload) => Promise<void>;
  editBookmark: (bookmarkData: UpdateBookmarkPayload) => Promise<void>;
  deleteBookmark: (bookmarkData: DeleteBookmarkPayload) => Promise<void>;
}

const { setError } = useUiStore.getState();

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  bookmarks: [],
  notes: null,
  recentBookmarks: [],
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  fetchBookmarks: async (folderId) => {
    set({ loading: true });
    try {
      const { bookmarks } = await getBookmarks(folderId);
      set({ bookmarks });
    } catch (error: any) {
      console.error("Error fetching bookmarks:", error);
      setError(error.response?.data?.error || "Failed to fetch bookmarks");
    } finally {
      set({ loading: false });
    }
  },

  fetchNotes: async (id) => {
    set({ loading: true });
    try {
      const { bookmark } = await getNoteById(id);
      set({ notes: bookmark || null });
      return bookmark || null;
    } catch (error: any) {
      console.error("Error fetching note:", error);
      setError(error.response?.data?.error || "Failed to fetch note");
      return undefined;
    } finally {
      set({ loading: false });
    }
  },

  clearBookmarks: () => {
    set({ bookmarks: [] });
  },

  getRecentBookmarks: async (limit = 10) => {
    set({ loading: true });
    try {
      const { bookmarks } = await getRecentBookmarks(limit);
      set({ recentBookmarks: bookmarks });
    } catch (error: any) {
      console.error("Error fetching recent bookmarks:", error);
      setError(
        error.response?.data?.error || "Failed to fetch recent bookmarks"
      );
    } finally {
      set({ loading: false });
    }
  },

  setRecentBookmarks: (bookmarks) => {
    set({ recentBookmarks: bookmarks });
  },
  addBookmark: async (bookmarkData) => {
    set({ loading: true });
    try {
      const { bookmark } = await createBookmark(bookmarkData);
      const { currentFolder, subfolders, folders } = useFolderStore.getState();

      if (currentFolder?.id === bookmark.folderId) {
        set((state) => ({ bookmarks: [...state.bookmarks, bookmark] }));
      } else {
        if (currentFolder) {
          if (
            subfolders?.find(
              (folder: { id: string }) => folder.id === bookmark.folderId
            )
          ) {
            useFolderStore.setState((state: any) => ({
              subfolders: state.subfolders.map((folder: any) =>
                folder.id === bookmark.folderId
                  ? {
                      ...folder,
                      _count: { bookmarks: folder._count.bookmarks + 1 },
                    }
                  : folder
              ),
            }));
          }
        } else if (folders.find((folder) => folder.id === bookmark.folderId)) {
          useFolderStore.setState((state: any) => ({
            folders: state.folders.map((folder: any) =>
              folder.id === bookmark.folderId
                ? {
                    ...folder,
                    _count: { bookmarks: folder._count.bookmarks + 1 },
                  }
                : folder
            ),
          }));
        }
      }

      set((state) => ({
        recentBookmarks: [bookmark, ...state.recentBookmarks.slice(0, 5)],
      }));
    } catch (error: any) {
      console.error("Error creating bookmark:", error);
      setError(error.response?.data?.error || "Failed to create bookmark");
    } finally {
      set({ loading: false });
    }
  },

  editBookmark: async (bookmarkData) => {
    set({ loading: true });
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
      set({ loading: false });
    }
  },

  deleteBookmark: async (bookmarkData) => {
    set({ loading: true });
    try {
      await deleteBookmark(bookmarkData);
      set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== bookmarkData.id),
        recentBookmarks: state.recentBookmarks.filter(
          (b) => b.id !== bookmarkData.id
        ),
      }));
      // Update folder counts
      useFolderStore.setState((state: any) => ({
        folders: state.folders.map((folder: any) => {
          if (folder.id === bookmarkData.id) {
            return {
              ...folder,
              _count: {
                bookmarks: folder._count.bookmarks - 1,
              },
            };
          }
          return folder;
        }),
        subfolders: state.subfolders?.map((folder: any) => {
          if (folder.id === bookmarkData.id) {
            return {
              ...folder,
              _count: {
                bookmarks: folder._count.bookmarks - 1,
              },
            };
          }
          return folder;
        }),
      }));
    } catch (error: any) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
