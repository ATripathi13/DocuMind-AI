import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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
