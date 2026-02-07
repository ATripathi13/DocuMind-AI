import { create } from 'zustand';

const useStore = create((set) => ({
    documentId: null,
    isProcessing: false,
    results: null,
    error: null,

    setDocumentId: (id) => set({ documentId: id }),
    setProcessing: (status) => set({ isProcessing: status }),
    setResults: (results) => set({ results }),
    setError: (error) => set({ error }),

    reset: () => set({ documentId: null, isProcessing: false, results: null, error: null }),
}));

export default useStore;
