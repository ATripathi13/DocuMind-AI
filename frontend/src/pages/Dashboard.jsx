import React, { useState } from 'react';
import useStore from '../store/useStore';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, List, Sparkles, Send, MoreHorizontal, User, Bell, Grid, Plus } from 'lucide-react';
import { askQuestion } from '../api/client';

const Dashboard = () => {
    const { results, documentId, setDocumentId } = useStore();
    const [question, setQuestion] = useState('');
    const [isAsking, setIsAsking] = useState(false);
    const [messages, setMessages] = useState([
        { type: 'ai', text: 'You can start your conversation' }
    ]);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!question.trim() || !documentId) return;

        const userMsg = { type: 'user', text: question };
        setMessages([...messages, userMsg]);
        setQuestion('');
        setIsAsking(true);

        try {
            const response = await askQuestion(documentId, question);
            setMessages(prev => [...prev, { type: 'ai', text: response.answer }]);
        } catch (err) {
            setMessages(prev => [...prev, { type: 'ai', text: 'Error connecting to intelligence node.' }]);
        } finally {
            setIsAsking(false);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-8 gap-8 bg-mesh overflow-hidden h-screen">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-12">
                    <h1 className="text-2xl font-black text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                            <Grid size={18} className="text-accent" />
                        </div>
                        DocuMind-AI
                    </h1>
                </div>

                <div className="flex items-center gap-6">
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <Bell size={20} />
                    </button>
                    <button className="text-slate-500 hover:text-white transition-colors">
                        <Grid size={20} />
                    </button>
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                            <img src="https://ui-avatars.com/api/?name=User+One&background=random" alt="User" />
                        </div>
                        <div className="w-8 h-8 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800">
                            <img src="https://ui-avatars.com/api/?name=AI+Bot&background=020617&color=fff" alt="AI" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex gap-8 overflow-hidden">
                {/* Column 1: Sidebar Items */}
                <div className="w-72 flex flex-col gap-6">
                    <button className="btn-upload flex items-center justify-center gap-3 w-full group">
                        <Plus size={18} className="group-hover:rotate-90 transition-transform" />
                        Upload PDF
                    </button>

                    <div className="flex-1 space-y-2 overflow-y-auto pr-2 scrollbar-hide">
                        {[
                            'Recency uploaded', 'Key Features', 'Latest analysis', 'Reference',
                            'Visual inspection', 'Word Analysis', 'Contracts'
                        ].map((item, i) => (
                            <div key={i} className={`nav-item ${i === 2 ? 'nav-item-active' : ''}`}>
                                <FileText size={18} className={i === 2 ? 'text-accent' : ''} />
                                <span className="text-sm">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Areas */}
                <div className="flex-1 grid grid-cols-12 gap-8 overflow-hidden">

                    {/* Column 2: Visual Analysis */}
                    <div className="col-span-3 dashboard-card p-8 flex flex-col items-center justify-center gap-8 relative overflow-hidden group">
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Real-Time Analysis</span>
                            <div className="tag">AI</div>
                        </div>

                        <div className="relative mt-8">
                            <div className="w-32 h-44 bg-slate-800/50 rounded-2xl border border-white/10 flex flex-col p-4 gap-2 shadow-2xl group-hover:glow-border transition-all duration-500">
                                <div className="w-full h-2 bg-white/10 rounded" />
                                <div className="w-2/3 h-2 bg-white/10 rounded" />
                                <div className="w-full h-2 bg-white/10 rounded" />
                                <div className="w-full h-2 bg-white/10 rounded" />
                                <div className="mt-auto self-end w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/50">
                                    <span className="text-[10px] font-black text-slate-950">AI</span>
                                </div>
                            </div>
                            <div className="absolute -inset-4 bg-accent/5 blur-3xl rounded-full -z-10" />
                        </div>

                        <div className="w-full mt-12 space-y-4">
                            <div className="chat-bubble-ai text-[10px] text-slate-400 italic">"Grounded structural mapping complete..."</div>
                        </div>
                    </div>

                    {/* Column 3: Reasoning Engine */}
                    <div className="col-span-5 flex flex-col gap-6 overflow-hidden">
                        <div className="flex-1 dashboard-card bg-white p-8 flex flex-col gap-6 overflow-hidden border-none shadow-[0_0_50px_rgba(0,0,0,0.2)]">
                            <div className="flex justify-between items-center text-slate-900">
                                <h3 className="text-sm font-black uppercase tracking-widest">Neural Reasoning</h3>
                                <MoreHorizontal size={18} className="text-slate-400" />
                            </div>

                            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={msg.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleAsk} className="chat-input-area bg-slate-100 border-slate-200">
                                <input
                                    type="text"
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                    placeholder="Consult Intelligence engine..."
                                    className="flex-1 bg-transparent text-slate-900 focus:outline-none text-sm font-medium"
                                />
                                <button type="submit" className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200 hover:scale-110 active:scale-95 transition-all">
                                    <Send size={16} />
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Column 4: Summary & Keywords */}
                    <div className="col-span-4 flex flex-col gap-8">
                        <div className="dashboard-card p-8 bg-slate-900 border-none relative group overflow-hidden">
                            <div className="absolute top-6 right-6 tag">AI</div>
                            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-6">Active Summary</h3>
                            <p className="text-xs text-slate-400 leading-relaxed font-light">
                                Comprehensive analysis of structural patterns and semantic nodes. The intelligence agent has identified cross-referential clauses inSection 4.2 regarding compliance mandates...
                            </p>
                            <button className="mt-8 w-full btn-upload bg-indigo-500 py-2.5 rounded-xl uppercase tracking-[0.2em] text-[10px]">
                                Export Report
                            </button>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
                        </div>

                        <div className="flex-1 dashboard-card p-8 border-none bg-slate-900/50">
                            <h3 className="text-white text-sm font-black uppercase tracking-widest mb-6">Extracted Meta</h3>
                            <div className="space-y-4">
                                {[
                                    { label: 'Term Interpretation', tag: 'High' },
                                    { label: 'Contextual Patterns', icon: true },
                                    { label: 'Downstream Risks', icon: true },
                                    { label: 'Policy Mismatch', icon: true }
                                ].map((item, i) => (
                                    <div key={i} className="flex justify-between items-center p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent animate-pulse" />
                                            <span className="text-xs text-slate-300 font-medium">{item.label}</span>
                                        </div>
                                        {item.tag ? <span className="tag text-[8px]">{item.tag}</span> : <MoreHorizontal size={14} className="text-slate-600" />}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
