import React, { useState } from 'react';
import { Upload, FileText, FileImage, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { uploadDocument } from '../api/client';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

const UploadArea = () => {
    const { setDocumentId, setProcessing, setResults, setError } = useStore();
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setIsUploading(true);
        setProcessing(true);
        setError(null);

        try {
            const data = await uploadDocument(file);
            setDocumentId(data.document_id);
            setResults(data);
            navigate('/document');
        } catch (err) {
            setError(err.message || 'Failed to upload document');
        } finally {
            setIsUploading(false);
            setProcessing(false);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'image/*': ['.jpg', '.jpeg', '.png']
        },
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${isDragActive ? 'border-accent bg-accent/5' : 'border-slate-700 hover:border-accent/50'
                }`}
        >
            <input {...getInputProps()} />
            <div className="bg-primary-light p-4 rounded-full">
                {isUploading ? (
                    <Loader2 className="text-accent animate-spin" size={40} />
                ) : (
                    <Upload className="text-accent" size={40} />
                )}
            </div>

            <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                    {isUploading ? 'Processing Document...' : 'Upload Document'}
                </h3>
                <p className="text-slate-400 max-w-xs mx-auto">
                    Drag and drop your PDF or images here, or click to browse
                </p>
            </div>

            <div className="flex gap-4 mt-6">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-md text-xs text-slate-400">
                    <FileText size={14} />
                    PDF
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-md text-xs text-slate-400">
                    <FileImage size={14} />
                    Image
                </div>
            </div>
        </div>
    );
};

export default UploadArea;
