import { create } from "zustand";

interface UiStore {
    loading: boolean;
    showFolderModal: boolean;
    showBookmarkModal: boolean;
    error: string | null;
    message: string | null;
    setLoading: (loading: boolean) => void;
    setShowFolderModal: (show: boolean) => void;
    setShowBookmarkModal: (show: boolean) => void;
    setError: (error: string | null) => void;
    setMessage: (message: string | null) => void;
}

export const useUiStore = create<UiStore>((set) => ({
    loading: true,
    showFolderModal: false,
    showBookmarkModal: false,
    error: null,
    message: null,
    setLoading: (loading) => set({ loading }),
    setShowFolderModal: (show) => set({ showFolderModal: show }),
    setShowBookmarkModal: (show) => set({ showBookmarkModal: show }),
    setError: (error) => set({ error }),
    setMessage: (message) => set({ message }),
}));