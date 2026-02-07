import React, { useState, useEffect } from 'react';
import useStore from '../store/useStore';
import { Key, ShieldCheck, X } from 'lucide-react';

const ApiKeyModal = () => {
    const { apiKey, setApiKey } = useStore();
    const [inputValue, setInputValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (!apiKey) {
            setIsOpen(true);
        }
    }, [apiKey]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim().startsWith('sk-')) {
            setApiKey(inputValue.trim());
            setIsOpen(false);
        } else {
            alert('Please enter a valid OpenAI API key starting with sk-');
        }
    };

    if (!isOpen) return (
        <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-3 bg-primary-light rounded-full border border-slate-700 text-slate-400 hover:text-accent transition-all shadow-xl z-[60]"
            title="Manage API Key"
        >
            <Key size={20} />
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
            <div className="glass-card max-w-md w-full p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-accent/10 p-3 rounded-xl text-accent">
                        <Key size={24} />
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <h2 className="text-2xl font-bold text-white mb-2 font-display">OpenAI API Key</h2>
                <p className="text-slate-400 text-sm mb-6">
                    To enable multi-agent reasoning and Q&A, please provide your OpenAI API key. This key is stored locally in your browser and never sent anywhere else except the DocuMind API headers.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">API Key</label>
                        <input
                            type="password"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="sk-..."
                            className="w-full bg-primary-dark border border-slate-700 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent transition-colors"
                            required
                        />
                    </div>

                    <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                        <ShieldCheck size={18} />
                        Save Key & Initialize
                    </button>
                </form>

                <p className="mt-4 text-[10px] text-slate-500 text-center uppercase tracking-tighter">
                    Encryption: Browser LocalStorage (Not persistent across devices)
                </p>
            </div>
        </div>
    );
};

export default ApiKeyModal;
