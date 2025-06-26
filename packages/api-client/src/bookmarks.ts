import { apiClient } from "./axiosInstance";

export const getBookmarks = async () => {
  try {
    const response = await apiClient.get(`/bookmarks`);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching bookmarks:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch bookmarks");
    
  }
};

export const createBookmark = async (bookmarkData: {
  url: string;
  notes?: string;
  folderId?: string | null;
}) => {
    try {
        const response = await apiClient.post(`/bookmarks`, bookmarkData);
        return response.data;
    } catch (error: Error | any) {
        console.error("Error creating bookmark:", error);
        throw new Error(error.response?.data?.error || "Failed to create bookmark");
    }
};

export const updateBookmark = async (bookmarkData: {
  id: string;
  url: string;
  notes?: string;
  folderId?: string | null;
}) => {
  try {
    const response = await apiClient.put(`/bookmarks`, bookmarkData);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error updating bookmark:", error);
    throw new Error(error.response?.data?.error || "Failed to update bookmark");
  }
};  

export const deleteBookmark = async (id: string) => {
  try {
    const response = await apiClient.delete(`/bookmarks`, {data: { id }});
    return response.data;
  } catch (error: Error | any) {
    console.error("Error deleting bookmark:", error);
    throw new Error(error.response?.data?.error || "Failed to delete bookmark");
  }
};