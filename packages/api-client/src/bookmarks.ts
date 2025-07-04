import { apiClient } from "./axiosInstance";
import type { CreateBookmarkPayload, DeleteBookmarkPayload, UpdateBookmarkPayload } from "@repo/types";

export const getBookmarks = async () => {
  try {
    const response = await apiClient.get(`/bookmarks`);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching bookmarks:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch bookmarks");
    
  }
};

export const createBookmark = async (bookmarkData: CreateBookmarkPayload) => {
    try {
        const response = await apiClient.post(`/bookmarks`, bookmarkData);
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