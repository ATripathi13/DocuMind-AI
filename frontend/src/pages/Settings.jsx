import React, { useState } from 'react';
import useStore from '../store/useStore';
import { Key, ShieldCheck, Database, Server, Cpu, Globe, Lock } from 'lucide-react';

const Settings = () => {
    const { apiKey, setApiKey } = useStore();
    const [inputValue, setInputValue] = useState(apiKey || '');
    const [saveStatus, setSaveStatus] = useState(null);

    const handleSave = (e) => {
        e.preventDefault();
        if (inputValue.trim().startsWith('sk-') || inputValue === '') {
            setApiKey(inputValue.trim());
            setSaveStatus('success');
            setTimeout(() => setSaveStatus(null), 3000);
        } else {
            setSaveStatus('error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-10">
                <h2 className="text-4xl font-black text-white mb-2 font-display tracking-tight">System Settings</h2>
                <p className="text-slate-400">Configure your enterprise deployment and credentials</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* API Credentials */}
                    <div className="glass-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-accent/10 rounded-lg text-accent">
                                <Key size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">API Credentials</h3>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3 ml-1">OpenAI Secret Key</label>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="sk-................................................"
                                        className="w-full bg-slate-950 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all outline-none"
                                    />
                                </div>
                                <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                                    <ShieldCheck size={14} className="text-success" />
                                    Stored locally. Key is passed via X-OpenAI-Key headers.
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="btn-primary flex items-center gap-2"
                                >
                                    Save Configuration
                                </button>
                                {saveStatus === 'success' && <span className="text-success text-sm font-bold animate-pulse">✓ Saved Successfully</span>}
                                {saveStatus === 'error' && <span className="text-error text-sm font-bold">Invalid key format</span>}
                            </div>
                        </form>
                    </div>

                    {/* Integration Status */}
                    <div className="glass-card p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                <Cpu size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-white">System Nodes</h3>
                        </div>

                        <div className="space-y-4">
                            {[
                                { name: 'Multi-Agent Orchestrator', status: 'Online', icon: <Cpu className="text-success" /> },
                                { name: 'OCR Engine (EasyOCR)', status: 'Online', icon: <Database className="text-success" /> },
                                { name: 'Layout Analyzer (YOLO)', status: 'Online', icon: <Server className="text-success" /> },
                                { name: 'Vector DB (Qdrant Cloud)', status: 'Online', icon: <Globe className="text-success" /> },
                            ].map((node, i) => (
                                <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 border border-white/5 rounded-xl">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        {node.icon}
                                        <span className="text-sm font-medium">{node.name}</span>
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-success bg-success/10 px-2 py-1 rounded">
                                        {node.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="glass-card p-8 bg-gradient-to-br from-accent/5 to-purple-500/5">
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Enterprise Support</h4>
                        <p className="text-xs text-slate-500 leading-relaxed mb-6">
                            DocuMind AI is configured for production scaling. Your current deployment is on a distributed node.
                        </p>
                        <button className="w-full py-3 rounded-xl border border-white/10 text-white text-xs font-bold hover:bg-white/5 transition-all">
                            View Documentation
                        </button>
                    </div>

                    <div className="glass-card p-8 border-error/20">
                        <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Advanced</h4>
                        <p className="text-xs text-slate-500 mb-6">Resetting clears all local storage including processed history.</p>
                        <button className="w-full py-3 rounded-xl bg-error/10 text-error text-xs font-bold hover:bg-error/20 transition-all">
                            Reset Workspace
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
