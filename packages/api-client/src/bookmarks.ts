import { apiClient } from "./axiosInstance";
import type { CreateBookmarkPayload, DeleteBookmarkPayload, UpdateBookmarkPayload } from "@repo/types";

export const getBookmarks = async (folderId: string) => {
  try {
    const response = await apiClient.get(`/bookmarks`, {
      params: { folderId },
    });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching bookmarks:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch bookmarks");
    
  }
};

export const createBookmark = async (bookmarkData: CreateBookmarkPayload) => {
    try {
        const response = await apiClient.post(`/bookmarks`, bookmarkData);
        console.log("Bookmark created successfully:", bookmarkData);
        
        return response.data;
    } catch (error: Error | any) {
        console.error("Error creating bookmark:", error);
        throw new Error(error.response?.data?.error || "Failed to create bookmark");
    }
};

export const updateBookmark = async (bookmarkData: UpdateBookmarkPayload) => {
  try {
    const response = await apiClient.put(`/bookmarks`, bookmarkData);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error updating bookmark:", error);
    throw new Error(error.response?.data?.error || "Failed to update bookmark");
  }
};  

export const deleteBookmark = async (bookmarkData: DeleteBookmarkPayload) => {
  try {
    const response = await apiClient.delete(`/bookmarks`, {data: { bookmarkData }});
    return response.data;
  } catch (error: Error | any) {
    console.error("Error deleting bookmark:", error);
    throw new Error(error.response?.data?.error || "Failed to delete bookmark");
  }
};

export const getRecentBookmarks = async (limit: number = 10) => {
  try {
    const response = await apiClient.get(`/bookmarks/recent`, { params: { limit } });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching recent bookmarks:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch recent bookmarks");
  }
};

export const getNoteById = async (id: string) => {
  try {
    const response = await apiClient.get(`/bookmarks/note`, {
      params: { id },
    });
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching bookmark by ID:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch bookmark by ID");
  }
};