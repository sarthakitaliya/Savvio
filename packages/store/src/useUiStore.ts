import { create } from "zustand";

interface UiStore {
    loading: boolean;
    showModel: boolean;
    setLoading: (loading: boolean) => void;
    setShowModel: (show: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    loading: false,
    showModel: false,
    setLoading: (loading) => set({ loading }),
    setShowModel: (show) => set({ showModel: show }),
    error: null,
    setError: (error) => set({ error }),
}));