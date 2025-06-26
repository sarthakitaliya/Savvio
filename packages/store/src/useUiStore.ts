import { create } from "zustand";

interface UiStore {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    loading: false,
    setLoading: (loading) => set({ loading }),
    error: null,
    setError: (error) => set({ error }),
}));