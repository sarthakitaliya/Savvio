import { apiClient } from "./axiosInstance";

export const getProfileStats = async () => {
  try {
    const response = await apiClient.get(`/profile/stats`);
    return response.data;
  } catch (error: Error | any) {
    console.error("Error fetching profile stats:", error);
    throw new Error(
      error.response?.data?.error || "Failed to fetch profile stats"
    );
  }
};
