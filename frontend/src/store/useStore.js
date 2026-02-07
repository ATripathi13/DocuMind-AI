import { create } from 'zustand';

const useStore = create((set) => ({
    documentId: null,
    isProcessing: false,
    results: null,
    error: null,
    apiKey: localStorage.getItem('openai_api_key') || null,

    setDocumentId: (id) => set({ documentId: id }),
    setProcessing: (status) => set({ isProcessing: status }),
    setResults: (results) => set({ results }),
    setError: (error) => set({ error }),
    setApiKey: (key) => {
        localStorage.setItem('openai_api_key', key);
        set({ apiKey: key });
    },

    reset: () => set({ documentId: null, isProcessing: false, results: null, error: null }),
}));

export default useStore;
