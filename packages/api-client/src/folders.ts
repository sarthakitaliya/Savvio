import type { CreateFolderPayload, DeleteFolderPayload, Folder, UpdateFolderPayload } from "@repo/types";
import { apiClient } from "./axiosInstance";

export const getFolders = async () => {
  try {
    const response = await apiClient.get(`/folders`);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching folders:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch folders");
  }
}

export const createFolder = async (folderData: CreateFolderPayload)=> {
  try {
    const response = await apiClient.post(`/folders`, folderData);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error creating folder:", error);
    throw new Error(error.response?.data?.error || "Failed to create folder");
  }
};  

export const updateFolder = async (folderData: UpdateFolderPayload) => {
  try {
    const response = await apiClient.put(`/folders`, folderData);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error updating folder:", error);
    throw new Error(error.response?.data?.error || "Failed to update folder");
  }
};

export const deleteFolder = async (folderData: DeleteFolderPayload) => {
  try {
    const response = await apiClient.delete(`/folders`, { data: folderData });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error deleting folder:", error);
    throw new Error(error.response?.data?.error || "Failed to delete folder");
  }
};

export const resolveFolderPath = async (segments: string[]) => {
  try {
    const queryParam = segments.join(",");
    const response = await apiClient.get(`/folders/resolve-path`, {
      params: { segments: queryParam },
    });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error resolving folder path:", error);
    throw new Error(error.response?.data?.error || "Failed to resolve folder path");
  }
};

export const getSubfolders = async (parentId: string) => {
  try {
    const response = await apiClient.get(`/folders/subfolders`, {
      params: { parentId },
    });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching subfolders:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch subfolders");
  }
}