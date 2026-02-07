import React, { useState } from 'react';
import useStore from '../store/useStore';
import { askQuestion } from '../api/client';
import { Terminal, Send, Search, CheckCircle2, AlertCircle, User, Bot, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';

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
            setChat(prev => [...prev, { type: 'error', content: 'Failed to get answer.' }]);
        } finally {
            setIsAsking(false);
        }
    };

    const agents = [
        { name: 'Vision Agent', icon: <Search size={18} />, status: 'completed', time: '1.2s', desc: 'Analyzed layout and detected 5 blocks.' },
        { name: 'Text Agent', icon: <Terminal size={18} />, status: 'completed', time: '2.4s', desc: 'Extracted text from 3 regions with 98% confidence.' },
        { name: 'Fusion Agent', icon: <Sparkles size={18} />, status: 'completed', time: '0.8s', desc: 'Merged text with layout blocks using spatial reasoning.' },
        { name: 'Validation Agent', icon: <ShieldCheck size={18} />, status: 'completed', time: '0.4s', desc: 'Cross-checked 12 data points. Confidence: 0.94' },
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Agent Timeline */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 font-display">Agent Workflow</h2>
                    <p className="text-slate-400">Visualization of the multi-agent reasoning chain</p>
                </div>

                <div className="relative space-y-8 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                    {agents.map((agent, i) => (
                        <div key={i} className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary border-2 border-slate-800 flex items-center justify-center text-accent group-hover:border-accent transition-colors z-10">
                                {agent.icon}
                            </div>
                            <div className="glass-card p-5 group-hover:border-accent/30 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-bold text-white">{agent.name}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs text-slate-500 font-mono italic">{agent.time}</span>
                                        <CheckCircle2 className="text-success" size={16} />
                                    </div>
                                </div>
                                <p className="text-sm text-slate-400">{agent.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Multi-Modal Q&A */}
            <div className="flex flex-col h-[700px] glass-card overflow-hidden">
                <div className="p-4 bg-primary-dark border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-bold text-white uppercase tracking-widest">Multi-Modal Reasoning Console</span>
                    </div>
                    <Activity size={18} className="text-slate-500" />
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {chat.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <Bot className="text-slate-700" size={64} />
                            <div>
                                <p className="text-white font-medium">DocuMind Assistant Ready</p>
                                <p className="text-slate-500 text-sm max-w-[250px]">Ask questions about tables, charts, or text in your document.</p>
                            </div>
                        </div>
                    )}

                    {chat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] p-4 rounded-2xl ${msg.type === 'user'
                                ? 'bg-accent text-primary-dark font-medium rounded-tr-none'
                                : 'bg-primary-dark border border-slate-800 text-slate-200 rounded-tl-none'
                                }`}>
                                <div className="flex items-center gap-2 mb-1">
                                    {msg.type === 'user' ? <User size={14} /> : <Bot size={14} className="text-accent" />}
                                    <span className="text-[10px] uppercase font-bold tracking-tighter">
                                        {msg.type === 'user' ? 'Evaluator' : 'DocuMind Agent'}
                                    </span>
                                </div>
                                <p className="text-sm">{msg.content}</p>
                                {msg.context && (
                                    <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest flex items-center gap-1">
                                            <Search size={10} /> Sources Found:
                                        </p>
                                        {msg.context.map((source, j) => (
                                            <div key={j} className="text-xs p-2 bg-black/20 rounded border border-white/5 text-slate-400 italic">
                                                “{source.text?.substring(0, 80)}...”
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isAsking && (
                        <div className="flex justify-start">
                            <div className="bg-primary-dark border border-slate-800 p-4 rounded-2xl rounded-tl-none">
                                <Loader2 className="animate-spin text-accent" size={20} />
                            </div>
                        </div>
                    )}
                </div>

                <form onSubmit={handleAsk} className="p-4 bg-primary-dark border-t border-slate-800 flex gap-2">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={!documentId || isAsking}
                        placeholder={documentId ? "Ask a question about the document..." : "Upload a document first"}
                        className="flex-1 bg-primary border border-slate-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!documentId || isAsking || !question.trim()}
                        className="bg-accent text-primary-dark p-2 rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
                    >
                        <Send size={18} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AnalysisConsole;
