import { create } from "zustand";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@repo/api-client";
import { useUiStore } from "./useUiStore";

interface Folder {
  id: string;
  name: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
  _count: {
    bookmarks: number;
  };
  createdAt?: string;
}

interface FolderStore {
  folders: Folder[];
  fetchFolders: () => Promise<void>;
  addFolder: (folderData: Omit<Folder, "id">) => Promise<void>;
  editFolder: (folderData: Folder) => Promise<void>;
  removeFolder: (id: string) => Promise<void>;
}
const { setLoading, setError } = useUiStore.getState();

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],

  fetchFolders: async () => {
    setLoading(true);
    try {
      const { folders } = await getFolders();
      set({ folders });
    } catch (error: any) {
      console.error("Error fetching folders:", error);
      setError(error.response?.data?.error || "Failed to fetch folders");
    } finally {
      setLoading(false);
    }
  },

  addFolder: async (folderData) => {
    setLoading(true);
    try {
      const { folder } = await createFolder(folderData);
      set((state) => ({ folders: [...state.folders, folder] }));
    } catch (error: any) {
      console.error("Error creating folder:", error);
      setError(error.response?.data?.error || "Failed to create folder");
    } finally {
      setLoading(false);
    }
  },

  editFolder: async (folderData) => {
    setLoading(true);
    try {
      const { folder } = await updateFolder(folderData);
      set((state) => ({
        folders: state.folders.map((f) => (f.id === folder.id ? folder : f)),
      }));
    } catch (error: any) {
      console.error("Error updating folder:", error);
      setError(error.response?.data?.error || "Failed to update folder");
    } finally {
      setLoading(false);
    }
  },

  removeFolder: async (id) => {
    setLoading(true);
    try {
      await deleteFolder(id);
      set((state) => ({
        folders: state.folders.filter((folder) => folder.id !== id),
      }));
    } catch (error: any) {
      console.error("Error deleting folder:", error);
      setError(error.response?.data?.error || "Failed to delete folder");
    } finally {
      setLoading(false);
    }
  },
}));
