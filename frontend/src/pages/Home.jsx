import React from 'react';
import UploadArea from '../components/UploadArea';

const Home = () => {
    return (
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
            <div className="mb-12">
                <h1 className="text-5xl font-bold font-display tracking-tight text-white mb-6">
                    DocuMind <span className="text-accent">AI</span>
                </h1>
                <p className="text-2xl font-light text-slate-300 mb-4">
                    Multi-Modal Document Intelligence
                </p>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    The next generation of document understanding. Combining Computer Vision, OCR, and Large Language Models to extract insights from complex documents with structured layout analysis and multi-agent reasoning.
                </p>
            </div>

            <div className="glass-card p-1">
                <UploadArea />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 text-left">
                <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                    <h4 className="text-accent font-semibold mb-2">Vision-First OCR</h4>
                    <p className="text-sm text-slate-400">Detect objects, tables, and figures before extracting text to preserve spatial context.</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                    <h4 className="text-accent font-semibold mb-2">Multi-Agent Fusion</h4>
                    <p className="text-sm text-slate-400">Independent agents coordinate to cross-validate data and resolve extraction conflicts.</p>
                </div>
                <div className="p-6 rounded-xl bg-slate-800/50 border border-slate-700">
                    <h4 className="text-accent font-semibold mb-2">Multi-Modal RAG</h4>
                    <p className="text-sm text-slate-400">Ask complex questions about your documents using a retrieval system that understands both text and images.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
