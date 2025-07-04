import { create } from "zustand";

interface UiStore {
    loading: boolean;
    showModal: boolean;
    error: string | null;
    message: string | null;
    setLoading: (loading: boolean) => void;
    setShowModal: (show: boolean) => void;
    setError: (error: string | null) => void;
    setMessage: (message: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    loading: false,
    showModal: false,
    error: null,
    message: null,
    setLoading: (loading) => set({ loading }),
    setShowModal: (show) => set({ showModal: show }),
    setError: (error) => set({ error }),
    setMessage: (message) => set({ message }),
}));