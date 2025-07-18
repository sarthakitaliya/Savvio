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

interface FolderStore {
  folders: Folder[];
  currentFolder: Folder | null;
  subfolders?: Folder[];
  folderLoading: boolean;
  setFolderLoading: (loading: boolean) => void;
  fetchFolders: () => Promise<void>;
  fetchSubfolders: (parentId: string) => Promise<void>;
  addFolder: (folderData: CreateFolderPayload) => Promise<void>;
  editFolder: (folderData: UpdateFolderPayload) => Promise<void>;
  removeFolder: (folderData: DeleteFolderPayload) => Promise<void>;
  resolveFolderPath: (segments: string[]) => Promise<Folder | null>;
  cleanUp: () => void;
}
const { setLoading, setError } = useUiStore.getState();

export const useFolderStore = create<FolderStore>((set) => ({
  folders: [],
  currentFolder: null,
  folderLoading: false,
  
  setFolderLoading: (loading: boolean) => set({ folderLoading: loading }),

  fetchFolders: async () => {
    set({ folderLoading: true });
    try {
      const { folders } = await getFolders();
      set({ folders });
    } catch (error: any) {
      console.error("Error fetching folders:", error);
      setError(error.response?.data?.error || "Failed to fetch folders");
    } finally {
      set({ folderLoading: false });
    }
  },

  fetchSubfolders: async (parentId) => {
    set({ folderLoading: true });
    try {
      const { folders } = await getSubfolders(parentId);
      set({ subfolders: folders });
    } catch (error: any) {
      console.error("Error fetching subfolders:", error);
      setError(error.response?.data?.error || "Failed to fetch subfolders");
    } finally {
      set({ folderLoading: false });
    }
  },

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
  cleanUp: () => {
    set({
      currentFolder: null,
      subfolders: undefined,
    });
  },
}));
