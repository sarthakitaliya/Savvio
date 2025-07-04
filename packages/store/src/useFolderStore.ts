import { create } from "zustand";
import {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder,
} from "@repo/api-client";
import { useUiStore } from "./useUiStore";
import type {
  CreateFolderPayload,
  DeleteFolderPayload,
  Folder,
  UpdateFolderPayload,
} from "@repo/types";


interface FolderStore {
  folders: Folder[];
  fetchFolders: () => Promise<void>;
  addFolder: (
    folderData: CreateFolderPayload
  ) => Promise<void>;
  editFolder: (folderData: UpdateFolderPayload) => Promise<void>;
  removeFolder: (folderData: DeleteFolderPayload) => Promise<void>;
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
      // setError(error.response?.data?.error || "Failed to create folder");
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

  removeFolder: async (folderData) => {
    setLoading(true);
    try {
      await deleteFolder(folderData);
      set((state) => ({
        folders: state.folders.filter((folder) => folder.id !== folderData.id),
      }));
    } catch (error: any) {
      console.error("Error deleting folder:", error);
      setError(error.response?.data?.error || "Failed to delete folder");
    } finally {
      setLoading(false);
    }
  },
}));
