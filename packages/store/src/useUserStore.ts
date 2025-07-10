import { create } from "zustand";
import { getProfileStats} from "@repo/api-client"

type User = {
  id: string;
  name: string;
  emailVerified: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  image?: string | null | undefined | undefined;
} | null;

interface UserState {
  user: User;
  stats: {
    totalFolders: number;
    totalBookmarks: number;
  } | null;

  setUser: (user: User) => void;
  setStats: (stats: { totalFolders: number; totalBookmarks: number }) => void;
  getProfileStats: () => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  stats: null,

  setUser: (user) => set({ user }),
  setStats: (stats) => set({ stats }),

  getProfileStats: async () => {
    try {
      const { totalFolders, totalBookmarks } = await getProfileStats();
      set({ stats: { totalFolders, totalBookmarks } });
    } catch (error) {
      console.error("Failed to fetch profile stats:", error);
    }
  },

  logout: () => set({ user: null, stats: null }),
}));
