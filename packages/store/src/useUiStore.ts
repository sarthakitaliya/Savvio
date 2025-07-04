import { create } from "zustand";

interface UiStore {
    loading: boolean;
    showModel: boolean;
    error: string | null;
    message: string | null;
    setLoading: (loading: boolean) => void;
    setShowModel: (show: boolean) => void;
    setError: (error: string | null) => void;
    setMessage: (message: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    loading: false,
    showModel: false,
    error: null,
    message: null,
    setLoading: (loading) => set({ loading }),
    setShowModel: (show) => set({ showModel: show }),
    setError: (error) => set({ error }),
    setMessage: (message) => set({ message }),
}));