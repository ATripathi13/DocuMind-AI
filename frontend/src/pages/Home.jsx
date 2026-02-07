import React from 'react';
import { motion } from 'framer-motion';
import UploadArea from '../components/UploadArea';
import { Sparkles, Zap, ShieldCheck, Cpu } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] -ml-64 -mb-64" />

            <div className="max-w-6xl mx-auto py-24 px-8 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8"
                >
                    <Sparkles size={14} className="animate-pulse" />
                    Enterprise Document Intelligence
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-black text-white mb-8 font-display tracking-tighter"
                >
                    DocuMind <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-500 italic">AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-slate-400 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-light"
                >
                    Next-generation document understanding pipeline. Unified orchestration of vision, OCR, and reasoning agents for extraction at scale.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="w-full max-w-2xl glass-card p-1"
                >
                    <UploadArea />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left">
                    {[
                        { icon: <Zap className="text-accent" />, title: 'Agentic Fusion', desc: 'Auto-merging spatial layouts with OCR text streams using high-fidelity LLM reasoning.' },
                        { icon: <ShieldCheck className="text-success" />, title: 'High Assurance', desc: 'Multi-modal validation scores and consistency checks for enterprise compliance.' },
                        { icon: <Cpu className="text-purple-400" />, title: 'RAG Native', desc: 'Hybrid retrieval architecture that understands both structured and unstructured data.' }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
                            whileHover={{ y: -5 }}
                            className="glass-card p-8 border-white/5 hover:border-white/10 transition-all flex flex-col items-start"
                        >
                            <div className="p-3 bg-white/5 rounded-xl mb-4">{feature.icon}</div>
                            <h4 className="text-white font-bold mb-2 tracking-tight">{feature.title}</h4>
                            <p className="text-sm text-slate-500 leading-relaxed font-light">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
