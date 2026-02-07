import React, { useState } from 'react';
import useStore from '../store/useStore';
import CanvasOverlay from '../components/CanvasOverlay';
import { FileText, Eye, Layout, ChevronRight, Brain } from 'lucide-react';

const DocumentView = () => {
    const { results, isProcessing } = useStore();
    const [activeTab, setActiveTab] = useState('ocr');
    const [hoveredBlock, setHoveredBlock] = useState(null);

    if (!results) return <div className="p-20 text-center text-slate-400 text-xl font-light">No document loaded. Please upload a document from the workspace.</div>;

    // Mocking image dimensions for now, in a real app these would come from the API
    const imageWidth = 800;
    const imageHeight = 1100;

    // Base URL for backend images
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    return (
        <div className="flex h-[calc(100vh-65px)] bg-primary-dark overflow-hidden">
            {/* Left Panel: Document Viewer */}
            <div className="flex-1 overflow-auto p-8 flex justify-center border-r border-slate-800">
                <div className="relative shadow-2xl bg-white">
                    {/* We assume the first page for the demo */}
                    {/* Note: Path needs to be converted from absolute to relative to static mount */}
                    {/* In the real API returns, we should return relative paths */}
                    <img
                        src={`${API_URL}/data/processed/sample_doc_page_1.jpg`}
                        alt="Document"
                        className="w-[800px] h-auto"
                    />
                    <div className="absolute top-0 left-0 pointer-events-auto">
                        <CanvasOverlay
                            imageWidth={800}
                            imageHeight={1100}
                            blocks={[]} // Blocks would come from results
                            onHover={setHoveredBlock}
                        />
                    </div>
                </div>
            </div>

            {/* Right Panel: Data Tabs */}
            <div className="w-[450px] flex flex-col bg-primary border-l border-slate-800">
                <div className="flex items-center gap-1 p-2 bg-primary-dark border-b border-slate-800">
                    <button
                        onClick={() => setActiveTab('ocr')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'ocr' ? 'bg-accent text-primary-dark' : 'text-slate-400 hover:text-white'}`}
                    >
                        <FileText size={16} />
                        OCR
                    </button>
                    <button
                        onClick={() => setActiveTab('vision')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'vision' ? 'bg-accent text-primary-dark' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Eye size={16} />
                        Vision
                    </button>
                    <button
                        onClick={() => setActiveTab('layout')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors rounded-lg ${activeTab === 'layout' ? 'bg-accent text-primary-dark' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Layout size={16} />
                        Layout
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === 'ocr' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                <FileText className="text-accent" size={20} />
                                Extracted Text
                            </h3>
                            <div className="p-4 bg-primary-dark rounded-xl border border-slate-800 font-mono text-sm leading-relaxed text-slate-300">
                                {results.text_data?.[0]?.full_text || 'No text extracted.'}
                            </div>
                        </div>
                    )}

                    {activeTab === 'vision' && (
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold flex items-center gap-2 text-white">
                                <Brain className="text-accent" size={20} />
                                Vision Detections
                            </h3>
                            <div className="space-y-3">
                                {results.vision_data?.[0]?.blocks?.map((block, i) => (
                                    <div key={i} className="p-4 bg-primary-dark border border-slate-800 rounded-xl hover:border-accent/50 transition-colors group">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="bg-accent/10 text-accent px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">{block.type}</span>
                                            <span className="text-slate-500 text-xs">{(block.confidence * 100).toFixed(1)}% confidence</span>
                                        </div>
                                        <p className="text-sm text-slate-300 line-clamp-2 italic">“{block.text || 'No text content'}”</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'layout' && (
                        <div className="space-y-4 text-center py-20">
                            <Layout className="text-slate-700 mx-auto" size={48} />
                            <p className="text-slate-500">Layout hierarchy visualizer coming soon.</p>
                        </div>
                    )}
                </div>

                {/* Confidence Footer */}
                <div className="p-4 bg-primary-dark border-t border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-400">Processing Status</span>
                        <span className="text-sm font-bold text-success">SUCCESS</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                            className="bg-accent h-full"
                            style={{ width: `${(results.confidence_score || 0) * 100}%` }}
                        />
                    </div>
                    <p className="mt-2 text-xs text-slate-500 text-center">
                        Multi-modal confidence score: <span className="text-slate-300 font-bold">{((results.confidence_score || 0) * 100).toFixed(1)}%</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentView;
