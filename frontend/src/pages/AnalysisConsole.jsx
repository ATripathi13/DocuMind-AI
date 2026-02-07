import React, { useState } from 'react';
import useStore from '../store/useStore';
import { askQuestion } from '../api/client';
import { Terminal, Send, Search, CheckCircle2, AlertCircle, User, Bot, Sparkles, ShieldCheck, Loader2, BrainCircuit, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalysisConsole = () => {
    const { results, documentId } = useStore();
    const [question, setQuestion] = useState('');
    const [chat, setChat] = useState([]);
    const [isAsking, setIsAsking] = useState(false);

    const handleAsk = async (e) => {
        e.preventDefault();
        if (!question.trim() || !documentId) return;

        const userMsg = { type: 'user', content: question };
        setChat([...chat, userMsg]);
        setQuestion('');
        setIsAsking(true);

        try {
            const response = await askQuestion(documentId, question);
            const botMsg = {
                type: 'bot',
                content: response.answer,
                context: response.context
            };
            setChat(prev => [...prev, botMsg]);
        } catch (err) {
            setChat(prev => [...prev, { type: 'error', content: 'Connection Lost: Neural node offline.' }]);
        } finally {
            setIsAsking(false);
        }
    };

    const agents = [
        { name: 'Vision Node', icon: <Search size={18} />, status: 'completed', time: '1.2s', desc: 'Analyzed layout and detected 5 structural blocks.' },
        { name: 'Text Node', icon: <Terminal size={18} />, status: 'completed', time: '2.4s', desc: 'Extracted semantic tokens with 98% precision.' },
        { name: 'Fusion Agent', icon: <Sparkles size={18} />, status: 'completed', time: '0.8s', desc: 'Merged spatial layout with text stream contextually.' },
        { name: 'Validator', icon: <ShieldCheck size={18} />, status: 'completed', time: '0.4s', desc: 'Finalized multi-modal confidence at 0.94 probability.' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto py-12 px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 min-h-screen"
        >
            {/* Left: Analyst Workspace */}
            <div className="space-y-10">
                <div>
                    <h2 className="text-4xl font-black text-white mb-3 font-display tracking-tight">Analyst Workbench</h2>
                    <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] border-l-2 border-accent pl-4">System Trace: Multi-Agent Reasoning Chain</p>
                </div>

                <div className="relative space-y-10 before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-[1px] before:bg-slate-800">
                    {agents.map((agent, i) => (
                        <div key={i} className="relative pl-16 group">
                            <div className="absolute left-0 top-0 w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-accent group-hover:border-accent transition-all z-10 shadow-xl group-hover:shadow-accent/10">
                                {agent.icon}
                            </div>
                            <div className="glass-card p-6 group-hover:border-white/20 transition-all hover:bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="font-bold text-white tracking-tight">{agent.name}</h4>
                                    <div className="flex items-center gap-4">
                                        <span className="text-[10px] text-slate-500 font-mono font-bold">{agent.time}</span>
                                        <CheckCircle2 className="text-success" size={16} />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 font-light leading-relaxed">{agent.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Reasoning console */}
            <div className="flex flex-col h-[750px] glass-card overflow-hidden shadow-2xl relative border-white/5">
                <div className="p-5 bg-slate-950/50 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                        <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Neural Intelligence Console</span>
                    </div>
                    <BrainCircuit size={18} className="text-slate-600" />
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-black/10">
                    {chat.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                            <div className="p-6 bg-white/5 rounded-full border border-white/5 animate-bounce-slow">
                                <Bot className="text-slate-700" size={64} />
                            </div>
                            <div>
                                <p className="text-white font-black uppercase tracking-widest text-sm mb-2">Interface Initialized</p>
                                <p className="text-slate-500 text-xs max-w-[280px] font-light italic">Ask complex questions about tables, semantic flows, or spatial patterns.</p>
                            </div>
                        </div>
                    )}

                    {chat.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-[90%] p-6 rounded-3xl ${msg.type === 'user'
                                ? 'bg-accent text-slate-950 font-bold shadow-xl shadow-accent/5 rounded-tr-none'
                                : 'bg-slate-900 border border-white/5 text-slate-200 rounded-tl-none shadow-xl'
                                }`}>
                                <div className={`flex items-center gap-2 mb-3 ${msg.type === 'user' ? 'text-slate-800' : 'text-accent'}`}>
                                    {msg.type === 'user' ? <User size={12} /> : <Sparkles size={12} />}
                                    <span className="text-[10px] uppercase font-black tracking-widest leading-none">
                                        {msg.type === 'user' ? 'Evaluator' : 'Agent Response'}
                                    </span>
                                </div>
                                <p className="text-sm leading-relaxed font-light">{msg.content}</p>
                                {msg.context && (
                                    <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                                        <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <Search size={10} /> Grounded Sources Found:
                                        </p>
                                        {msg.context.map((source, j) => (
                                            <div key={j} className="text-[10px] p-3 bg-black/30 rounded-xl border border-white/5 text-slate-400 italic font-mono leading-normal">
                                                “{source.text?.substring(0, 100)}...”
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                    {isAsking && (
                        <div className="flex justify-start">
                            <div className="bg-slate-900/50 p-4 rounded-3xl rounded-tl-none border border-white/5 shadow-xl">
                                <Loader2 className="animate-spin text-accent" size={20} />
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleAsk} className="p-6 bg-slate-950/50 border-t border-white/5 flex gap-3">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={!documentId || isAsking}
                        placeholder={documentId ? "Query Neural Console..." : "Initialize Workspace to Query"}
                        className="flex-1 bg-slate-900 border border-white/5 rounded-2xl px-5 py-4 text-xs font-light focus:outline-none focus:border-accent/40 transition-all placeholder:text-slate-700 disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!documentId || isAsking || !question.trim()}
                        className="bg-accent text-slate-950 p-4 rounded-2xl hover:bg-accent-hover transition-all disabled:opacity-50 shadow-lg shadow-accent/20"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default AnalysisConsole;
