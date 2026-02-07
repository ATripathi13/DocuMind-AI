import React, { useState, useCallback, useRef } from 'react';
import useStore from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, MessageSquare, List, Sparkles, Send, MoreHorizontal, User, Bell, Grid, Plus, Loader2, Search, Zap, ShieldCheck } from 'lucide-react';
import { askQuestion, uploadDocument } from '../api/client';
import { useDropzone } from 'react-dropzone';

const Dashboard = () => {
    const { results, documentId, setDocumentId, setProcessing, setResults, setError, isProcessing } = useStore();
    const [question, setQuestion] = useState('');
    const [isAsking, setIsAsking] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'ai', text: 'Intelligence node active. You can start your conversation.' }
    ]);

    const fileInputRef = useRef(null);

    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file) return;

        setProcessing(true);
        setError(null);

        try {
            const data = await uploadDocument(file);
            setDocumentId(data.document_id);
            setResults(data);
            setMessages([{ type: 'ai', text: `Document ${file.name} initialized. Analysis complete.` }]);
        } catch (err) {
            setError(err.message || 'Failed to upload document');
        } finally {
            setProcessing(false);
        }
    }, [setDocumentId, setProcessing, setResults, setError]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.jpeg', '.png'] },
        multiple: false,
        noClick: true
    });

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!question.trim() || !documentId) return;

        const userMsg = { type: 'user', text: question };
        setMessages(prev => [...prev, userMsg]);
        setQuestion('');
        setIsAsking(true);

        try {
            const response = await askQuestion(documentId, question);
            setMessages(prev => [...prev, { type: 'ai', text: response.answer }]);
        } catch (err) {
            setMessages(prev => [...prev, { type: 'ai', text: 'Error: Reasoning node connectivity lost.' }]);
        } finally {
            setIsAsking(false);
        }
    };

    return (
        <div {...getRootProps()} className="flex-1 flex flex-col p-8 gap-8 bg-mesh overflow-hidden h-screen transition-all">
            <input {...getInputProps()} />

            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-12">
                    <h1 className="text-2xl font-black text-white flex items-center gap-2">
                        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center shadow-lg shadow-accent/20">
                            <Grid size={22} className="text-accent" />
                        </div>
                        <span className="tracking-tighter uppercase">DocuMind-AI</span>
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <button className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                        <Bell size={20} />
                    </button>
                    <button className="p-2.5 bg-white/5 rounded-xl text-slate-500 hover:text-white transition-all">
                        <Search size={20} />
                    </button>
                    <div className="flex items-center gap-3 bg-white/5 p-1.5 pr-4 rounded-full border border-white/5">
                        <div className="flex -space-x-2">
                            <img className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" src="https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff" />
                            <img className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800" src="https://ui-avatars.com/api/?name=AI&background=020617&color=fff" />
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live session</span>
                    </div>
                </div>
            </div>

            <div className={`flex-1 flex gap-8 overflow-hidden transition-all ${isDragActive ? 'opacity-50 scale-95' : ''}`}>
                <div className="w-72 flex flex-col gap-6">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => onDrop(e.target.files)} />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="btn-upload flex items-center justify-center gap-3 w-full group relative overflow-hidden"
                    >
                        {isProcessing ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} className="group-hover:rotate-90 transition-transform" />}
                        {isProcessing ? 'Processing...' : 'Upload PDF'}
                    </button>

                    <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-hide">
                        <p className="px-5 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">Workspace Navigation</p>
                        {[
                            { label: 'Recency uploaded', icon: <FileText size={16} /> },
                            { label: 'Key Features', icon: <Sparkles size={16} /> },
                            { label: 'Latest analysis', icon: <Zap size={16} />, active: true },
                            { label: 'Reference Docs', icon: <FileText size={16} /> },
                            { label: 'Visual Maps', icon: <Grid size={16} /> },
                            { label: 'Integrity Check', icon: <ShieldCheck size={16} /> }
                        ].map((item, i) => (
                            <div key={i} className={`nav-item ${item.active ? 'nav-item-active' : ''} cursor-pointer group`}>
                                <div className={`${item.active ? 'text-accent' : 'text-slate-500 group-hover:text-white'}`}>
                                    {item.icon}
                                </div>
                                <span className="text-sm">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">
                    <div className="col-span-3 dashboard-card p-8 flex flex-col items-center justify-center gap-8 relative overflow-hidden group border-white/5">
                        <div className="absolute top-8 left-8 flex items-center gap-3">
                            <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Analysis</span>
                            <div className="tag">Node 01</div>
                        </div>

                        <div className="relative mt-8">
                            <motion.div
                                animate={isProcessing ? { scale: [1, 1.05, 1], rotate: [0, 1, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-36 h-48 bg-slate-950/50 rounded-[32px] border-2 border-white/5 flex flex-col p-6 gap-3 shadow-2xl group-hover:glow-border transition-all duration-500"
                            >
                                <div className="w-full h-2.5 bg-white/10 rounded-full" />
                                <div className="w-3/4 h-2.5 bg-white/10 rounded-full" />
                                <div className="w-full h-2.5 bg-white/5 rounded-full" />
                                <div className="w-full h-2.5 bg-white/10 rounded-full" />
                                <div className="w-1/2 h-2.5 bg-white/5 rounded-full" />
                                <div className="mt-auto self-end w-10 h-10 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/40">
                                    <Sparkles size={18} className="text-slate-950" />
                                </div>
                            </motion.div>
                            <div className="absolute -inset-10 bg-accent/10 blur-[80px] rounded-full -z-10 group-hover:bg-accent/20 transition-all duration-700" />
                        </div>

                        <div className="w-full mt-12 text-center">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status Index</p>
                            <p className="text-xs text-slate-300 font-light italic">
                                {isProcessing ? "Synchronizing token streams..." : (results ? "Contextual mapping verified." : "Awaiting document initialization.")}
                            </p>
                        </div>
                    </div>

                    <div className="col-span-5 flex flex-col gap-6 overflow-hidden">
                        <div className="flex-1 dashboard-card bg-white p-8 flex flex-col gap-6 overflow-hidden border-none shadow-[0_40px_100px_rgba(0,0,0,0.1)]">
                            <div className="flex justify-between items-center text-slate-900 px-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Reasoning Engine</h3>
                                <div className="flex gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 px-2 scrollbar-hide">
                                <AnimatePresence>
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
                                        >
                                            <div className={msg.type === 'user' ? 'chat-bubble-user font-bold shadow-lg shadow-indigo-500/20' : 'chat-bubble-ai font-medium text-slate-700 bg-slate-50'}>
                                                {msg.text}
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {isAsking && (
                                    <div className="flex items-start">
                                        <div className="chat-bubble-ai bg-slate-50 border-none">
                                            <Loader2 size={16} className="animate-spin text-accent" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <form onSubmit={handleAsk} className="chat-input-area bg-slate-50 border-slate-100 focus-within:bg-slate-100 transition-all">
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder={documentId ? "Consult Intelligence..." : "Upload document to initialize..."}
                                    disabled={!documentId || isAsking}
                                    className="flex-1 bg-transparent text-slate-900 focus:outline-none text-sm font-medium placeholder:text-slate-400"
                                />
                                <button
                                    type="submit"
                                    disabled={!documentId || isAsking || !question.trim()}
                                    className="bg-indigo-600 text-white p-3.5 rounded-2xl shadow-xl shadow-indigo-200 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="col-span-4 flex flex-col gap-8">
                        <div className="dashboard-card p-10 bg-slate-900 border-none relative group overflow-hidden">
                            <div className="absolute top-10 right-10 tag shadow-lg shadow-accent/10">AI Summary</div>
                            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Active Context</h3>
                            <div className="max-h-48 overflow-y-auto scrollbar-hide">
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    {results ? (
                                        results.text_data?.[0]?.full_text?.substring(0, 300) + "..."
                                    ) : (
                                        "No active context. Please initialize a document node from the workspace to begin high-assurance semantic mapping."
                                    )}
                                </p>
                            </div>
                            <button className="mt-10 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl shadow-indigo-900/20 active:scale-95">
                                Export Integrity Report
                            </button>
                            <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-accent/10 blur-[100px] rounded-full group-hover:bg-accent/20 transition-all duration-1000" />
                        </div>

                        <div className="flex-1 dashboard-card p-10 border-none bg-slate-900/40 backdrop-blur-3xl overflow-hidden relative">
                            <h3 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Neural Metadata</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Spatial Interpretation', tag: 'High' },
                                    { label: 'Contextual Patterns', active: true },
                                    { label: 'Refined Integrity', active: true },
                                    { label: 'Downstream Risks', active: true }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        className="flex justify-between items-center p-4 bg-white/[0.03] rounded-[24px] border border-white/5 hover:bg-white/[0.06] transition-all group cursor-pointer"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-2 h-2 rounded-full ${item.tag ? 'bg-accent' : (item.active ? 'bg-indigo-500' : 'bg-slate-800')} group-hover:scale-150 transition-transform`} />
                                            <span className="text-xs text-slate-400 font-bold group-hover:text-white transition-colors">{item.label}</span>
                                        </div>
                                        {item.tag ? <span className="tag text-[8px] py-1"> {item.tag}</span> : <div className="p-1 bg-white/5 rounded-lg"><MoreHorizontal size={14} className="text-slate-600" /></div>}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950/50 to-transparent pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
