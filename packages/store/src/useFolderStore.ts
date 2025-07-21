import { create } from "zustand";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
  resolveFolderPath,
  getSubfolders,
} from "@repo/api-client";
import { useUiStore } from "./useUiStore";
import type {
  CreateFolderPayload,
  DeleteFolderPayload,
  Folder,
  UpdateFolderPayload,
} from "@repo/types";
import { useBookmarkStore } from "./useBookmarkStore";

interface FolderStore {
  folders: Folder[];
  currentFolder: Folder | null;
  subfolders?: Folder[];
  folderLoading: boolean;
  editingFolder: Folder | null;
  setEditingFolder: (folder: Folder | null) => void;
  clearEditingFolder: () => void;
  setFolderLoading: (loading: boolean) => void;
  fetchFolders: () => Promise<void>;
  fetchSubfolders: (parentId: string) => Promise<void>;
  setSubfolders: (subfolders: Folder[]) => void;
  addFolder: (folderData: CreateFolderPayload) => Promise<void>;
  updateFolder: (folderData: UpdateFolderPayload) => Promise<void>;
  deleteFolder: (folderData: DeleteFolderPayload) => Promise<void>;
  resolveFolderPath: (segments: string[]) => Promise<Folder | null>;
  cleanUp: () => void;
}
const { setLoading, setError, setLoadingFolderSkeleton } = useUiStore.getState();

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  currentFolder: null,
  folderLoading: false,
  editingFolder: null,
  setEditingFolder: (folder: Folder | null) => set({ editingFolder: folder }),
  clearEditingFolder: () => set({ editingFolder: null }),
  setFolderLoading: (loading: boolean) => set({ folderLoading: loading }),

  fetchFolders: async () => {
    setLoadingFolderSkeleton(true);
    try {
      const { folders } = await getFolders();
      set({ folders });
    } catch (error: any) {
      console.error("Error fetching folders:", error);
      setError(error.response?.data?.error || "Failed to fetch folders");
    } finally {
      setLoadingFolderSkeleton(false);
    }
  },

  fetchSubfolders: async (parentId) => {
    setLoadingFolderSkeleton(true);
    try {
      const { folders } = await getSubfolders(parentId);
      set({ subfolders: folders });
    } catch (error: any) {
      console.error("Error fetching subfolders:", error);
      setError(error.response?.data?.error || "Failed to fetch subfolders");
    } finally {
      setLoadingFolderSkeleton(false);
    }
  },

  setSubfolders: (subfolders) => set({ subfolders }),

  resolveFolderPath: async (segments) => {
    setLoading(true);
    try {
      const { folder } = await resolveFolderPath(segments);
      set({ currentFolder: folder });
      return folder;
    } catch (error: any) {
      console.error("Error resolving folder path:", error);
      setError(error.response?.data?.error || "Folder not found");
    } finally {
      setLoading(false);
    }
  },

  addFolder: async (folderData) => {
    setLoading(true);
    try {
      const { folder } = await createFolder(folderData);
      const folderWithCount: Folder = {
        ...folder,
        _count: {
          bookmarks: 0,
        },
      };
      set((state) => {
        if (state.currentFolder?.id === folderData.parentId) {
          return {
            subfolders: [...(state.subfolders || []), folderWithCount],
          };
        }
        return {
          folders: [...state.folders, folderWithCount],
        };
      });
    } catch (error: any) {
      console.error("Error creating folder:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  updateFolder: async (folderData) => {
    setLoading(true);
    try {
      const { folder } = await updateFolder(folderData);
      set((state) => {
        const olderFolder = state.folders.find((f) => f.id === folder.id);
        const oldSubfolder = state.subfolders?.find((f) => f.id === folder.id);
        const folderWithOldCount = {
          ...folder,
          _count: olderFolder?._count ?? { bookmarks: 0 },
        };
        const subFolderWithOldCount = {
          ...folder,
          _count: oldSubfolder?._count ?? { bookmarks: 0 },
        };
        return {
          folders: state.folders.map((f) =>
            f.id === folder.id ? folderWithOldCount : f
          ),
          subfolders: state.subfolders?.map((f) =>
            f.id === folder.id ? subFolderWithOldCount : f
          ),
        };
      });
    } catch (error: any) {
      console.error("Error updating folder:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  },

  deleteFolder: async (folderData) => {
    setLoading(true);
    try {
      await deleteFolder(folderData);
      set((state) => ({
        folders: state.folders.filter((folder) => folder.id !== folderData.id),
        subfolders: state.subfolders?.filter(
          (folder) => folder.id !== folderData.id
        ),
      }));

      const { recentBookmarks, setRecentBookmarks } =
        useBookmarkStore.getState();
      const updatedRecentBookmarks = recentBookmarks.filter(
        (bookmark) => bookmark.folderId !== folderData.id
      );
      setRecentBookmarks(updatedRecentBookmarks);
    } catch (error: any) {
      throw error;
    } finally {
      setLoading(false);
    }
  },
  cleanUp: () => {
    set({
      currentFolder: null,
      subfolders: undefined,
    });
  },
}));
