import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000' : '');

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the API key
client.interceptors.request.use((config) => {
    const key = localStorage.getItem('openai_api_key');
    if (key) {
        config.headers['X-OpenAI-Key'] = key;
    }
    return config;
});

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await client.post('/process-doc', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const askQuestion = async (documentId, question) => {
    const response = await client.post(`/ask?question=${encodeURIComponent(question)}&document_id=${documentId}`);
    return response.data;
};

export const getConfidence = async (documentId) => {
    const response = await client.get(`/confidence?document_id=${documentId}`);
    return response.data;
};

export default client;
