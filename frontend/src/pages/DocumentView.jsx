import React, { useState } from 'react';
import useStore from '../store/useStore';
import CanvasOverlay from '../components/CanvasOverlay';
import { FileText, Eye, Layout, ChevronRight, Brain, Search, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const DocumentView = () => {
    const { results, isProcessing } = useStore();
    const [activeTab, setActiveTab] = useState('ocr');

    if (!results) return (
        <div className="h-screen flex items-center justify-center bg-slate-950">
            <div className="text-center space-y-4">
                <div className="inline-flex p-4 bg-white/5 rounded-full text-slate-700">
                    <Search size={48} />
                </div>
                <p className="text-slate-500 text-lg font-light italic">Researcher: No active document found. Please initialize a workspace.</p>
            </div>
        </div>
    );

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-screen flex flex-col bg-slate-950 overflow-hidden"
        >
            {/* Header Area */}
            <div className="px-8 py-4 bg-slate-900/30 border-b border-white/5 flex items-center justify-between backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-accent/10 rounded-xl text-accent shadow-lg shadow-accent/10">
                        <Search size={18} />
                    </div>
                    <div>
                        <h2 className="text-xs font-black text-white uppercase tracking-[0.2em] leading-none">Researcher Interface</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1.5 flex items-center gap-1">
                            <Info size={10} /> Active Session: {results.document_id?.substring(0, 8)}...
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex flex-col items-end">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-1.5">Confidence</span>
                        <div className="flex items-center gap-2">
                            <div className="w-16 bg-white/5 h-1 rounded-full overflow-hidden">
                                <div className="bg-success h-full" style={{ width: `${(results.confidence_score || 0.85) * 100}%` }} />
                            </div>
                            <span className="text-sm font-mono text-success font-black tracking-tighter">{(results.confidence_score || 0.85).toFixed(2)}</span>
                        </div>
                    </div>
                    <button className="bg-accent/10 hover:bg-accent/20 border border-accent/20 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-accent transition-all">
                        Generate Report
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Visual Workspace */}
                <div className="flex-1 p-10 bg-black/40 overflow-auto scrollbar-hide relative group">
                    <div className="max-w-4xl mx-auto shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden border border-white/5 relative">
                        <img
                            src={`${API_URL}/data/processed/sample_doc_page_1.jpg`}
                            alt="Document"
                            className="w-full h-auto opacity-70 group-hover:opacity-90 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
                        />
                        <div className="absolute inset-0 pointer-events-none">
                            <CanvasOverlay
                                regions={results.vision_data?.[0]?.blocks || []}
                                imageWidth={800}
                                imageHeight={1100}
                            />
                        </div>
                    </div>
                </div>

                {/* Intelligence Panel */}
                <div className="w-[480px] bg-slate-900/50 border-l border-white/5 flex flex-col backdrop-blur-xl">
                    <div className="flex p-3 gap-2 bg-black/20 border-b border-white/5">
                        {[
                            { id: 'ocr', label: 'OCR Extraction', icon: <FileText size={14} /> },
                            { id: 'vision', label: 'Vision Blocks', icon: <Brain size={14} /> }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 py-3 px-2 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === tab.id
                                        ? 'bg-accent text-slate-950 shadow-lg shadow-accent/20'
                                        : 'text-slate-500 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                        {activeTab === 'ocr' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest border-l-2 border-accent pl-4">System Extraction Output</p>
                                <div className="p-6 bg-slate-950/80 border border-white/5 rounded-3xl shadow-inner">
                                    <p className="text-xs text-slate-300 font-mono leading-relaxed selection:bg-accent/30 whitespace-pre-wrap">
                                        {results.text_data?.[0]?.full_text || "Analysis in progress..."}
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'vision' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-4"
                            >
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest border-l-2 border-purple-500 pl-4">Detected Layout Objects</p>
                                {(results.vision_data?.[0]?.blocks || []).map((block, i) => (
                                    <div key={i} className="group p-5 bg-slate-950 border border-white/5 hover:border-accent/30 rounded-2xl transition-all cursor-pointer shadow-lg hover:shadow-accent/5">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black text-accent bg-accent/10 px-2 py-0.5 rounded uppercase tracking-wider">{block.type || block.label}</span>
                                            <span className="text-[10px] font-mono text-slate-600 font-bold">{(block.confidence * 100).toFixed(1)}%</span>
                                        </div>
                                        <p className="text-xs text-slate-400 font-light italic line-clamp-2">"Preserving spatial context for multi-agent reasoning flow."</p>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </div>

                    <div className="p-6 bg-black/20 border-t border-white/5">
                        <div className="flex items-center gap-3 text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Researcher Stream: Active</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DocumentView;
