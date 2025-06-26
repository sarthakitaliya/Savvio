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

export const createFolder = async (folderData: {
  name: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
}) => {
  try {
    const response = await apiClient.post(`/folders`, folderData);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error creating folder:", error);
    throw new Error(error.response?.data?.error || "Failed to create folder");
  }
};  

export const updateFolder = async (folderData: {
  id: string;
  name: string;
  parentId?: string | null;
  color?: string;
  icon?: string;
}) => {
  try {
    const response = await apiClient.put(`/folders`, folderData);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error updating folder:", error);
    throw new Error(error.response?.data?.error || "Failed to update folder");
  }
};

export const deleteFolder = async (id: string) => {
  try {
    const response = await apiClient.delete(`/folders`, { data: { id } });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error deleting folder:", error);
    throw new Error(error.response?.data?.error || "Failed to delete folder");
  }
};