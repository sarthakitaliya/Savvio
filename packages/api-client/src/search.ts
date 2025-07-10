import { apiClient } from "./axiosInstance";
import type { SearchPayload } from "@repo/types";

export const searchBookmarks = async (payload: SearchPayload) => {
    try {
        const response = await apiClient.get(`/search`, {
            params: {
                q: payload.q,
                scope: payload.scope,
                folderId: payload.folderId || undefined,
            },
        });
        return response.data;
    } catch (error: Error | any) {
        console.error("Error searching bookmarks:", error);
        throw new Error(error.response?.data?.error || "Failed to search bookmarks");
        
    }
}